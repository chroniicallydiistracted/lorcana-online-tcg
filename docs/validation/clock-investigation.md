# Local clock rejection investigation

Recorded October 14, 2026 UTC (October 13, America/Phoenix). Intake was clean `main` at `6e9acf1ec2130386e6687f48513a30aaf32b397d`; documentation work uses `codex/clock-investigation`, CHG-20261014-001. Executable fingerprint remains `2c3439767b30e3c65877269dfcfae8f11da59bb57389188a1e6083147a141fc9`. These are dated observations of this PC, not a claim that future clock behavior is unchanged.

## Finding and scope

Docker Desktop's `initd` deliberately obtains Windows backend time and sets Linux calendar time every 30 seconds. A kernel trace catches those calls at the calendar jumps. A second trace identifies `chronyd` applying successful tick/frequency changes that slow the shared Linux clock; Ubuntu's `systemd-timesyncd` also adjusts that clock. Windows, Hyper-V's reference and Linux's unadjusted timer agree closely in the paired comparison. The adjusted Linux elapsed timer runs slower during that observation. This explains how calendar corrections accumulate enough difference against the elapsed timer to reject otherwise completed local CI.

The immediate mechanism and active controllers are established. Why chronyd acquired its large correction estimate, the exact ownership/configuration of its hidden system process, and a durable single-controller repair remain unqualified. Interaction between controllers is a supported explanation; no isolated trial has established the complete feedback chain or a CPU/firmware defect. The first October 6 reversed receipt is historical and is not retrospectively attributed to this trace.

The Director authorized bounded administrator clock traces and a five-minute pause of **only Ubuntu's** time-sync service, followed by restoration. No permanent settings, guard threshold, Windows service, Docker service, kernel parameter, credential or application behavior changed. No heavyweight CI was rerun. The pause/restoration changed live timing behavior temporarily; it was not wholly read-only.

## What the rejection protects

`scripts/documentation-lib.mjs` compares raw UTC duration with captured monotonic elapsed duration. Reversed UTC or an absolute difference greater than 1,000 ms makes the recorder report `clock_changed`, `clock_discontinuous` and `failed`, even with child exit0. Documentation validation enforces the same contract and the CI launcher withholds qualified artifacts. This protects timestamp/duration consistency, not gameplay correctness or absolute UTC accuracy. A constant UTC error can escape it. Preserve old failed receipts; neither re-label them as passed nor adjust their timestamps.

For example, RUN-20261013-113's child completed all 14 stages with exit0, but recorded 313,227 ms UTC versus 311,971 ms monotonic: a 1,256 ms difference. The failure is timing qualification. Its output still records the actual child checks. A policy that retains an explicit clock warning separately from test outcome is a possible later change; it would need coordinated recorder/schema/validator/CI review. This investigation does not implement that policy or authorize disabling the guard.

## Measurements and attribution

The [capsule manifest](archive/clock-20261014/manifest.json) identifies 24 retained observation/script/checker payloads by digest. RUN-20261014-001 is an explicitly historical import: null qualified execution times/exits, reported diagnostics, raw samples retained. It is not a reconstructed passing native test receipt. Archive scripts are text snapshots, not installed application commands; do not rerun the service-pausing script without authorization.

- Overlapping minute observations each collected 121 samples. Windows' steady UTC/performance-counter discrepancy changed 0.142 ms, range 0.484 ms after its first two warm-up samples. WSL and container Python both gained 306.119 ms; Node showed the same events within its millisecond calendar resolution. The identical Linux steps locate the discrepancy below the application recorder.
- A private 45-second ftrace instance captured `initd` entering `do_settimeofday64` through `do_sys_settimeofday64`, at trace times 20877.880293 and 20908.030449. Enclosing intervals gained 150.930321 and 149.115861 ms. The instance used 128 KiB per CPU, was removed, and global trace controls remained unchanged. No Hyper-V setter was captured in that window; this does not exclude it elsewhere.
- The running Docker daemon's filesystem identifies Docker Desktop. Its installed ELF hash is `ec9a99250040d8fd14ccab324faa2d107f64f9bf5f411af78a8c7492d53540fb`, BuildID `cad18e60b7d31a6ba314f674e39735e50ae8c49b`. Go metadata names Docker's `desktop.runBackendTimeSync`; the successful retrieval path calls `syscall.Settimeofday` then starts a 30,000,000,000 ns timer. No drift-magnitude condition was found on that path. An initial address mapping missed a 0x100-byte C-runtime prefix; only the corrected, cross-checked mapping is used. [Installed-code observations](archive/clock-20261014/initd-observations.json) retain this distinction; the binary/full disassembly is not redistributed.
- Docker's Windows backend log supplies `GET /time` responses at 00:17:58.219497000Z and 00:18:28.370077000Z, corresponding to the first trace. [Selected metadata](archive/clock-20261014/docker-time.json) excludes unrelated backend/session data. Exact historical trace-task-to-distro-PID translation remains unrecorded; attribution rests on the trace, installed routine and matching backend events together.
- A 45-second read-only Ubuntu trace confirms an actual `clock_adjtime` mutation with `ADJ_OFFSET` and a +389,052,151 ns offset, returning `TIME_OK`. Its deliberate observation timeout124 detached the tracer. This was an observation window, not a failed application test.
- A later 45-second kernel trace captures 12 successful `chronyd` calls with modes16386 (`ADJ_TICK | ADJ_FREQUENCY`), tick values9806–9822 microseconds versus nominal10000, plus a successful Ubuntu offset adjustment and another `initd` calendar-set call. Only mode-selected fields and matched returns are retained in the [sanitized trace](archive/clock-20261014/rate-adjustments.jsonl); unused structure members contained indeterminate values and are not evidence. The private instance and both probes were removed, global controls unchanged. The first setup attempt failed because Python text append sought on the virtual control file; cleanup succeeded and the retry used OS-level writes. This failure is retained in the manifest and first-attempt transcript.

The WSL system `chronyc` reports PHC0 as selected, with large variable frequency estimates (roughly16,000–18,000 ppm fast across observations). Its process does not appear in the default Ubuntu/Docker namespace listings, so the system-root `/etc/chrony.conf` is **not** certified as the running daemon's effective configuration. A daemon's estimate is not an independent measurement of faulty hardware.

## Approved pause and restoration

Sampling uses paired calendar/monotonic reads every half second. All durations below are measured monotonic windows; raw timestamps remain in the archive.

| Phase | Window | Calendar minus monotonic | Steps over10 ms |
|---|---:|---:|---:|
| Original Ubuntu service active | 45 s | +257.029459 ms | 2 |
| Only Ubuntu service paused | 300 s | +2,429.729064 ms | 10 |
| Ubuntu service restored | 60 s | +866.836183 ms | 3 |

The restored window includes a restart/initial-sync step and is not a steady-state capacity or rate estimate. The trial shows stopping Ubuntu alone is insufficient; Docker's roughly30-second corrections continued and the discrepancy grew faster during this interval. It does not prove that every workload without Ubuntu must be worse.

A separate transient six-minute safety timer was armed before stopping the service. The normal finally path restored it at raw sample00:55:21.076972Z, active/enabled with PID178796, and removed the timer. A later read-only check confirmed active/enabled and the timer `not-found/inactive`. No persistent enablement/configuration changed; Docker, VS Code workspace and PostgreSQL stayed running.

## Paired Windows/Hyper-V/Linux reference

A persistent Windows sampler and Linux before/after reads bound each cross-system query. Discard the first two warm-up samples. Stable indices2–30 have a maximum IPC window1.039582 ms; midpoint comparisons carry that sampling uncertainty.

| Clock | Elapsed across the same paired endpoints | Difference from Windows counter |
|---|---:|---:|
| Windows performance counter | 28,399.513200 ms | reference |
| Linux unadjusted timer (`MONOTONIC_RAW`) | 28,399.481576 ms | −0.031624 ms |
| Hyper-V reference (`/dev/ptp0`, opened read-only) | 28,399.477450 ms | −0.035750 ms |
| Linux adjusted elapsed timer (`MONOTONIC`) | 28,021.416426 ms | −378.096774 ms |
| Linux calendar (`REALTIME`) | 28,187.519170 ms | −211.994030 ms |

The first three agree within sampling uncertainty; the adjusted timer is about1.331% slower in this sample. Hyper-V/Windows UTC midpoint offsets remain0.0842–0.645 ms. Calendar/Windows offsets vary with slewing and a correction. This confirms a software-adjusted clock-rate disagreement during the sample; it does not certify external UTC, all CPU cores, suspend behavior or long-term stability. The owned Windows sampler exited0 and the read-only clock device closed.

## Environment and operational implications

`Ubuntu` and `docker-desktop` are the two running WSL2 distributions. Docker CLI in Ubuntu resolves into Docker Desktop; Ubuntu has no standalone docker.service/dockerd. This is normal integration, not a duplicated Docker installation. Both distributions share the kernel clock. Current kernel is6.18.33.2, clocksource`tsc`, implicit Hyper-V synchronization enabled. Windows W32Time was stopped during read-only inspection; this alone does not prove Windows UTC incorrect.

The workspace `01ccec184b44` and healthy original PostgreSQL `c7cd58258c19`, Compose project`lorcana-online-tcg_devcontainer`, remain available. Node24.21.0/pnpm10.33.0/Bun1.4.2 and source/configuration/requirement bytes are unchanged. Application checks run in that container; administrator host traces are separately categorized. No game listener was started by the investigation. All owned samplers, tracer instances/probes and restore timers completed or were removed; no database reset/recreation or global cleanup occurred.

Before another maintenance trial, establish the running system chronyd's actual service/configuration/namespace and a supported way to isolate it from other clock controllers. Any pause of it, persistent setting, manual clock reset or WSL/Docker restart needs new Director authorization. Measure a lightweight paired-clock window before considering another heavy CI run. Ubuntu's general guidance on avoiding competing synchronization services is useful context; this PC's unsuccessful Ubuntu-only trial overrides treating that as a proven fix.

PLAY-01 remains complete at the unchanged source. RUN-20261014-002 freshly observes successful public GitHub workflow/job metadata for audit run38482253396 and main run38483130685, both at6e9acf1. Hosted test counts/all14 internal stages were supplied by the Director; this metadata probe does not independently recount those tests or verify downloaded artifacts. PLAY-02 privacy, PLAY-03 transport/recovery, PLAY-04 clocks, authenticated delivery, real-device/performance and ordinary/official/reward admission remain gated. This diagnostic work adds no gameplay acceptance.

## Primary references

- [Docker Desktop WSL integration](https://docs.docker.com/desktop/features/wsl/) explains the shared-kernel distribution layout.
- [Ubuntu WSL synchronization guidance](https://ubuntu.com/wsl/docs/stable/explanation/time-sync/) discusses competing host/NTP synchronization.
- [Exact kernel timekeeping implementation](https://raw.githubusercontent.com/microsoft/WSL2-Linux-Kernel/linux-msft-wsl-6.18.33.2/kernel/time/timekeeping.c) separates calendar resets, monotonic continuity and NTP-adjusted versus raw timekeeping.
- [Exact kernel adjustment structure/mode definitions](https://raw.githubusercontent.com/microsoft/WSL2-Linux-Kernel/linux-msft-wsl-6.18.33.2/include/uapi/linux/timex.h) define the fields decoded in the trace.
- [systemd255 timesync manager](https://raw.githubusercontent.com/systemd/systemd/v255/src/timesync/timesyncd-manager.c) adjusts offsets and reacts to external clock changes.
- [Chrony tracking reference](https://chrony-project.org/doc/4.6/chronyc.html) defines software clock correction and frequency estimates.
- [Microsoft performance-counter guidance](https://learn.microsoft.com/en-us/windows/win32/sysinfo/acquiring-high-resolution-time-stamps) distinguishes elapsed counters from UTC accuracy.

## Documentation closure

The archived consistency checker recomputes all capsule digests (including decoded Windows bytes and staged-index equality), comparison arithmetic, selected rate-call fields/returns and cleanup observations, and compares protected executable/configuration/requirement bytes to6e9acf1. Native container receipts record this check and the documentation synchronization/validation separately from the historical experiment import. See [CHG-20261014-001](../changes/CHG-20261014-001.json) for outcomes. Full application/build/browser/database suites are not repeated for this documentation-only change; their existing source-specific evidence remains preserved.

## Git portability correction — CHG-20261014-002

The initial22-payload capsule passed RUN003. Staging review found two Windows captures contain CRLF, which the unchanged Git attributes would normalize. Their exact original bytes now use base64 text with both encoded and decoded byte counts/digests; no calendar sample is edited. The original manifest/checker are preserved as two additional payloads, making24. RUN-20261014-008 passes the final checker against staged Git bytes, so a canonical checkout retains the same evidence. [CHG-20261014-002](../changes/CHG-20261014-002.json) records this correction and its closure. Earlier native records/logs stay unchanged. This corrects archive representation only; it adds no clock repair or application acceptance.
