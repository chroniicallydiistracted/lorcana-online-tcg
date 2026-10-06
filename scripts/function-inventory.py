"""Describe project-owned Python callables without executing their code."""
import ast
import json
import sys

source = sys.stdin.read()
entries = []
for node in ast.walk(ast.parse(source)):
    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)):
        entries.append({"name": getattr(node, "name", "<lambda>"), "line": node.lineno,
                        "column": node.col_offset + 1, "kind": type(node).__name__,
                        "signature": ast.unparse(node.args)})
print(json.dumps(sorted(entries, key=lambda item: (item["line"], item["column"]))))
