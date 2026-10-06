# Original archive provenance

`VALIDATION_RESULTS.json` records preparation-time checks for the original workspace starter. `SHA256SUMS.txt` describes the original distributed archive bytes. Both are preserved unchanged as historical evidence.

They do not describe current application validation or guarantee checksums of the Git checkout. Git normalizes CSV line endings under `.gitattributes`, and BOOT-01 changes the source after that archive. Use Git commit/tree identities for current source and `docs/validation/boot-01.md` for current validation. Do not regenerate the archive checksum file to imply a new archive release.
