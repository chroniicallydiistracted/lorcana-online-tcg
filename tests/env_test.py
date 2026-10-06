import importlib.util
from pathlib import Path
import re
import tempfile
import unittest

script = Path(__file__).resolve().parents[1] / "scripts/init-local-env.py"
spec = importlib.util.spec_from_file_location("local_env", script)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class LocalEnvironmentTests(unittest.TestCase):
    def test_private_random_credentials_and_idempotent_setup(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.assertTrue(module.create_local_env(root))
            target = root / ".env.local"
            original = target.read_bytes()
            self.assertRegex(original.decode(), r"POSTGRES_PASSWORD=[a-f0-9]{64}\n")
            self.assertEqual(target.stat().st_mode & 0o777, 0o600)
            self.assertFalse(module.create_local_env(root))
            self.assertEqual(target.read_bytes(), original)

    def test_independent_workspace_credentials(self):
        with tempfile.TemporaryDirectory() as first, tempfile.TemporaryDirectory() as second:
            module.create_local_env(Path(first))
            module.create_local_env(Path(second))
            extract = lambda path: re.search(r"POSTGRES_PASSWORD=(\w+)", path.read_text()).group(1)
            self.assertNotEqual(extract(Path(first) / ".env.local"), extract(Path(second) / ".env.local"))

    def test_existing_user_configuration_is_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / ".env.local"
            target.write_text("existing-local-config\n")
            self.assertFalse(module.create_local_env(Path(directory)))
            self.assertEqual(target.read_text(), "existing-local-config\n")

    def test_symlink_cannot_redirect_secret_creation(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / ".env.local").symlink_to(root / "outside.env")
            with self.assertRaises(RuntimeError):
                module.create_local_env(root)
            self.assertFalse((root / "outside.env").exists())
