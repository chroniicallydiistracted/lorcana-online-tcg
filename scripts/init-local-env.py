"""Create local bootstrap credentials once. Never print or overwrite them."""

import os
from pathlib import Path
import secrets


def create_local_env(directory: Path) -> bool:
    target = directory / ".env.local"
    if target.is_symlink():
        raise RuntimeError("Refusing a symlink at .env.local")
    if target.exists():
        if not target.is_file():
            raise RuntimeError(".env.local must be a regular file")
        return False

    content = (
        "APP_ENV=local\n"
        "POSTGRES_USER=lorcana_bootstrap\n"
        "POSTGRES_DB=lorcana_local\n"
        f"POSTGRES_PASSWORD={secrets.token_hex(32)}\n"
    )
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW
    try:
        descriptor = os.open(target, flags, 0o600)
    except FileExistsError:
        raise RuntimeError(".env.local appeared during setup; leaving it unchanged") from None
    with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as stream:
        stream.write(content)
    return True


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    try:
        created = create_local_env(root)
    except (OSError, RuntimeError) as error:
        raise SystemExit(f"Local environment setup failed: {error}") from None
    print("Created private .env.local." if created else "Existing .env.local preserved.")
