# Local clock rejection investigation

Recorded October 14, 2026 UTC (October 13, America/Phoenix). Intake was clean `main` at `6e9acf1ec2130386e6687f48513a30aaf32b397d`; documentation work uses `codex/clock-investigation`, CHG-20261014-001. Executable fingerprint remains `2c3439767b30e3c65877269dfcfae8f11da59bb57389188a1e6083147a141fc9`. These are dated observations of this PC, not a claim that future clock behavior is unchanged. CHG-20261014-003 continues at e36d223 with an approved root-namespace inspection and temporary rate-isolation test; the follow-up below is the current finding.

## Finding and scope

Docker Desktop's `initd` deliberately obtains Windows backend time and sets Linux calendar time every 30 seconds. A kernel trace catches those calls at the calendar jumps. A second trace identifies `chronyd` applying successful tick/frequency changes that slow the shared Linux clock; Ubuntu's `systemd-timesyncd` also adjusts that clock. Windows, Hyper-V's reference and Linux's unadjusted timer agree closely in the paired comparison. The adjusted Linux elapsed timer runs slower during that observation. This explains how calendar corrections accumulate enough difference against the elapsed timer to reject otherwise completed local CI.

The immediate mechanism and active controllers are established. The follow-up below now identifies mini_init as the owner of the hidden daemon, records its effective PHC configuration and proves that its inherited kernel-rate correction distorts the elapsed timer. How its estimate first became biased remains a source-supported controller-interference explanation, rather than a complete reconstruction of historical learning. A lasting repair and a CPU/firmware defect are not established. The first October 6 reversed receipt is historical and is not retrospectively attributed to this trace.

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

The WSL system `chronyc` reports PHC0 as selected, with large variable frequency estimates (roughly16,000–18,000 ppm fast across observations). Its process does not appear in the default Ubuntu/Docker namespace listings, so that first child-namespace inspection did **not** certify its `/etc/chrony.conf` as the running daemon's effective configuration. The approved follow-up resolves the true parent namespace/configuration below. A daemon's estimate is not an independent measurement of faulty hardware.

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

The first checkpoint required identifying the running chronyd's actual owner/configuration/namespace before another trial. CHG-20261014-003 completes that identification and the specifically approved temporary isolation below. Additional pauses, persistent settings, manual calendar resets or WSL/Docker restarts still need new Director authorization. Measure a lightweight paired-clock window before considering another heavy CI run. Ubuntu's general guidance on avoiding competing synchronization services is useful context; this PC's unsuccessful Ubuntu-only trial overrides treating that as a proven fix.

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

## Root-namespace and rate-isolation follow-up — CHG-20261014-003

This completes the authorized investigation of the **current rejection mechanism**. It does not implement a lasting environment repair. The [follow-up capsule](archive/clock-20261014-followup/manifest.json) retains 19 payloads, including raw admin captures, all four phases, three paired cross-system observations, source-review digests, failed first external-reference capture, helper/script snapshots and read-only consistency/privacy checkers. Windows CRLF/console bytes are encoded with decoded digests before staging. RUN-20261014-010 is a historical import with null qualified execution times, not a passing seven-minute CI receipt. Native checks qualify capsule/document consistency and retained environment access separately.

### Actual daemon and source

The Director-approved elevated Windows console reaches the real VM root namespaces, unlike Ubuntu root or `wsl --system`'s child namespace. It observes mini_init PID 1 and chronyd PID 181, PPID 1, PID namespace `4026531836` / mount namespace `4026531832`, running `/sbin/chronyd`. Its ELF SHA-256 is `53c4cff03448e1f9be758a95eccd40a351ee1d5fd8a9d36ee9448a814c7b3b1b`. The Azure Linux package is `chrony-4.5-1.azl3.x86_64`; the client reports DEVELOPMENT, so upstream 4.5 source is a qualified explanatory baseline, not a claim that the packaged ELF is byte-identical to unpatched upstream.

WSL release 2.7.14 resolves to commit `372dd3499231809730b551fddb58ce50baff6ee5`. Its StartTimeSyncAgent writes the six-line PHC configuration and launches chronyd from mini_init; the live parent/configuration match that implementation. Actual daemon configuration:

```text
driftfile /var/lib/chrony/drift
makestep 1.0 3
rtcsync
leapsectz right/UTC
logdir /var/log/chrony
refclock PHC /dev/ptp0 poll 3 dpoll -2 offset 0
```

The saved estimate was 23,697.905598 ppm with error 724.667591 ppm; the live tracking estimate was 27,016.688 ppm fast. The later trial used a kernel correction near 27,600 ppm. These estimates are software state. Read-only pairing shows the unadjusted Linux timer and Hyper-V reference agree with Windows, rather than a measured oscillator running 2.7% fast. Editing Ubuntu's chrony configuration would not change this parent daemon. WSL generates the parent configuration at startup, so a live edit is not a demonstrated persistent control.

### Controlled test and restoration

The Director expressly approved pausing only WSL chronyd for about six minutes, neutralizing inherited tick/frequency correction for five minutes, then restoring the saved rate and resuming the same daemon. Automatic review had rejected the original trial proposal under read-only authority; that command did not execute. Compilation/read-only preparation proceeded safely, then the approved trial ran. No additional pause or persistent repair is inferred from this authorization.

The static helper pins PID 181 using a pidfd, arms a separate pipe/deadline watchdog before pausing it, samples calendar/adjusted/raw clocks and uses the unadjusted clock to bound phases. Only ADJ_TICK/FREQUENCY are changed; it never sets calendar time. Ubuntu's time service and Docker continue throughout. A 40-second paused phase first retains the old rate, then a 300-second phase uses nominal tick 10000/frequency 0. Exact source and launch script are archived text; they are not installed development commands.

| Phase | Raw elapsed | Calendar minus adjusted elapsed | Adjusted rate versus raw |
|---|---:|---:|---:|
| Original daemon running |40.347164 s |+854.087973 ms |−27707.557982 ppm |
| Daemon paused, inherited correction |40.477551 s |+848.631973 ms |−27595.836356 ppm |
| Daemon paused, neutral correction |300.448200 s |+658.302580 ms |+0.001035 ppm |
| Saved correction restored, daemon resumed |40.500991 s |+798.396585 ms |−21907.562064 ppm |

The neutral phase includes transition corrections; its 658 ms difference is below the existing 1,000 ms criterion for that observation only. No CI workload ran during it. The restored phase includes resumption/relearning transients; sampled kernel state temporarily reports unsynchronized, and final chrony tracking reports Normal. These windows are not long-term stability or capacity proof.

The helper successfully reapplied saved tick 9724/frequency 272890 (kernel return 0), resumed the same PID 181 (return 0), reaped its watchdog and exited 0. Final tracking identifies PHC0 with 27,611.703 ppm fast, and the six-line configuration is unchanged. Windows captured 422,191 ms elapsed. The console client does not terminate on root logout; the adapter killed only its owned Windows client after the Linux result marker, giving that client exit −1. This is not a failed helper. The owned administrator launcher subsequently exited. Forced watchdog fallback was not separately fault-injected; normal arming/reaping is observed.

No persistent settings were edited. Chronyd can continue writing its drift estimate as part of ordinary operation; the test restores saved kernel fields and the original process, not byte-identical learned history. Ubuntu remains active/enabled with its existing PID 178796. Original workspace `01ccec184b44` and healthy PostgreSQL `c7cd58258c19` remain running. No credential/volume recreation, game listener, Windows resync, global clock reset, Docker/WSL restart or heavy CI was performed.

### Independent paired comparison

Each observation discards warm-up indices 0–1 and retains indices 2–30, with before/after IPC bounds below 1 ms. Owned Windows samplers exit0 and close the read-only PHC descriptor.

| Observation | Windows elapsed | Linux adjusted elapsed | Adjusted minus Windows |
|---|---:|---:|---:|
| Before trial |28805.423400 ms |28019.241419 ms |−786.181981 ms |
| During neutral correction |28024.771800 ms |28024.780875 ms |+0.009075 ms |
| After restoration |28701.272800 ms |28021.598070 ms |−679.674730 ms |

Linux raw and Hyper-V elapsed readings remain within 0.1 ms of Windows at these endpoints, inside query uncertainty. Changing the kernel correction removes the large elapsed-rate discrepancy and restoring it brings the discrepancy back. This establishes rate causality on this PC, without treating a daemon's hardware-drift estimate as independent hardware evidence.

### Why the competing controllers matter

Docker initd's measured subsecond calendar corrections, WSL chronyd's PHC rate discipline and Ubuntu's external NTP adjustments act on one shared kernel clock. Chrony upstream 4.5 recognizes unexpected external jumps only beyond its 10-second detection threshold. The much smaller Docker corrections can remain in measurement history and be interpreted as drift; Ubuntu also targets external UTC while the other controllers follow Windows. This explains a plausible feedback path toward a biased frequency estimate. The installed ELF's exact scheduler constant and the complete initial estimator history were not independently reconstructed, so that learning explanation remains an inference. The actual slowing correction and its effect are directly tested.

Stopping Ubuntu alone previously failed. Stopping chronyd alone retains the bad rate. A calendar-only resync does not remove inherited tick/frequency state. Repeatedly setting Linux time, widening/removing the guard or patching vendor binaries would not establish accurate timekeeping. The current clock guard correctly detects a real discrepancy; its logic, threshold and earlier failed receipts remain unchanged.

### Absolute UTC is a separate issue

The read-only Windows stripchart obtained successful samples from time.windows.com, time.cloudflare.com and ntp.ubuntu.com. Before the trial their offsets were typically +0.46 s, one +0.409496 s. Afterward offsets were +0.484323–+0.497304 s, with round-trip delays 0.030308–0.166681 s. Positive reference offsets indicate Windows is behind those references. W32Time remains Stopped/Manual. No Windows service change or resynchronization occurred.

These independent, unauthenticated network references suggest a roughly half-second Windows UTC error; round-trip delay/path asymmetry and source trust bound the conclusion. They do not certify absolute UTC. A constant error can pass the project duration guard. Aligning Windows UTC is therefore worthwhile, but fixing only that offset does not neutralize Linux's existing 2.7% correction.

### Repair recommendation and acceptance plan

Retain the guard and hosted passing PLAY-01 evidence. A lasting repair is a separate maintenance change requiring Director authorization; the temporary proof is complete and all paused resources are restored. The reviewable candidate is:

1. Save current Windows time policy, Ubuntu service/configuration and WSL/Docker versions; preserve source, credentials and the original database volume. Confirm whether Windows policy is managed before changing it.
2. Restore supported Windows automatic time synchronization and measure external offsets with round-trip bounds. Remove Ubuntu's overlapping Internet time controller only as an explicitly authorized service decision. The earlier Ubuntu-only test prevents claiming that action alone solves the problem.
3. Reset/relearn the biased WSL chronyd state through a supported maintenance path while Windows and the remaining controllers share the same reference. Chrony's documented `reset sources` discards measurements, but alone does not prove removal of inherited rate or prevention of renewed interference. No reset command was executed. WSL's documented configuration table and pinned startup source provide no qualified persistent toggle for this root daemon; do not install a boot-time kill loop or rewrite vendor images as an incidental repair. If the same bias returns, this capsule is ready for authorized Microsoft/Docker support review.
4. Measure at least 20 minutes at low load and repeat after sleep/wake and any authorized restart. Require paired calendar/elapsed difference within the existing 1 s criterion throughout the qualification window, raw/Windows/reference agreement within sampling bounds and separately assessed external UTC. Record restored services/roles/mounts and every unsuccessful attempt. The 20-minute window is this proposed maintenance qualification, not an accepted new product requirement.
5. Once stable and host memory permits, execute one fresh 14-stage native isolated pipeline. Preserve old failed records and keep physical Windows/browser/device/production acceptance separate. Do not reuse the controlled five-minute window to claim that pipeline passed.

This recommendation is prepared, not applied. Persistent controller coordination, restart/sleep stability, exact initial learning history and absolute UTC certification remain pending. PLAY-02 is not assigned by this investigation, and no privacy/play/reward admission gate changes.

### Follow-up documentation qualification

The new consistency checker recomputes 19 payload digests and decoded originals, phase arithmetic, all three bounded comparisons, saved-field restoration/helper exit, existing service/container observations, and protected source/configuration/requirement bytes. Its index mode additionally compares every payload against staged Git bytes. A separate changed-file scan checks known private values and token/URI patterns in both plain and decoded captures. Native doctor and authenticated bootstrap database checks pass after restoration; the project/source fingerprint remains `2c343976`. Uniform change history and final documentation/verification commands are linked from CHG-20261014-003. No full foundation/browser/image/production suite was rerun for this documentation-only scope.

Additional primary references: [pinned WSL startup](https://raw.githubusercontent.com/microsoft/WSL/372dd3499231809730b551fddb58ce50baff6ee5/src/linux/init/main.cpp), [WSL maintainer on the root daemon](https://github.com/microsoft/WSL/issues/10024#issuecomment-1522426963), [Chrony 4.5 jump detection](https://raw.githubusercontent.com/mlichvar/chrony/4.5/sched.c), [Chrony 4.5 tick/frequency implementation](https://raw.githubusercontent.com/mlichvar/chrony/4.5/sys_linux.c), [Chrony 4.5 commands](https://chrony-project.org/doc/4.5/chronyc.html) and [supported WSL settings](https://learn.microsoft.com/en-us/windows/wsl/wsl-config). Source-review payloads retain exact downloaded digests; source excerpts/binaries are not redistributed.

## Controller tug-of-war follow-up — 2026-10-18 UTC

Recorded 2026-10-18T22:02:57.989Z (CHG-20261018-002) by the Claude Code agent (architect/QA reviewer role) on Director instruction. The Director assigned clock research and fixes as admin work to this reviewer. This section is read-only research. No clock, service or setting was changed.

### What changed since 2026-10-14

| Date (UTC) | Kernel rate correction | Calendar behaviour seen by receipts |
|---|---|---|
| 2026-10-14 | about −2.76% (saved tick 9724) | calendar gains about 0.85 s per 40 s against monotonic |
| 2026-10-16 | about +8% (inferred) | calendar steps back about 2.46 s every 30 s |
| 2026-10-18 | +3.4% to +3.8% (tick 10337–10384), monotonic +36,374 ppm against raw (RUN-20261018-007) | calendar steps back about 1.05 s every 29 s |

The correction applied by the WSL root chronyd is not converging: it has changed sign and size within four days. `adjtimex` readings taken every 15 s show the tick and frequency fields being rewritten continuously, with chronyd's estimated error jumping between 0 and about 60 ms.

### Two stepping controllers, one reacting to the other

On WSL Ubuntu (same kernel), a 120 s correlation sampled realtime against `CLOCK_MONOTONIC_RAW` every 0.1 s, alongside `timedatectl show-timesync` (host observation; script retained in the reviewer's scratchpad, summarized here):

- Every ~29 s there are two backward steps 0.1–0.2 s apart, about −0.50 to −0.53 s and then −0.53 to −0.54 s.
- The second step coincides (within one 0.1 s sample) with each new NTP exchange of Ubuntu's `systemd-timesyncd`. That service is active and enabled, polls `ntp.ubuntu.com` at its 32 s minimum interval (5,875 packets so far), and keeps its own frequency of about −30 ppm.
- At the same time, Windows' own `w32tm /stripchart` against time.cloudflare.com and time.windows.com showed Windows about 0.53–0.54 s away from those references. That is about the size of the second step. Windows Time (W32Time) is Stopped/Manual. On 2026-10-14 the reported offsets were about +0.46–0.50 s with the opposite sign, so an undisciplined Windows clock has moved by about 1 s in four days.

The numbers fit this sequence:

1. Chronyd's wrong rate makes Linux gain about 1.05 s per 29 s.
2. Docker/WSL sets the calendar to Windows time; that is the first step.
3. timesyncd, which reacts to the external clock change, immediately exchanges with `ntp.ubuntu.com` and steps the clock to Internet time, which disagrees with Windows by about 0.54 s; that is the second step.

Both corrections are below chronyd's 10 s jump-detection threshold. Each one lands in its PHC offset history. With a correction every ~29 s that cancels the drift, chronyd's long-window regression sees little net trend, so its rate estimate is poorly constrained and wanders. This strengthens the earlier inference about competing controllers. It is still an inference about chronyd's estimator, not a reconstruction of its internal history.

### Proposed controlled test

Each step needs the Director: steps 1 and 3 need the Ubuntu password, and step 2 restarts WSL, Docker and the Dev Container.

1. Stop Ubuntu's competing controller temporarily: `sudo systemctl stop systemd-timesyncd`. Measure 20 minutes with the same probes and check:
   - Do the paired steps become single steps?
   - Do chronyd's tick and frequency settle toward 10000 and 0?
   - Do receipt durations agree?

   It can be started again with `sudo systemctl start systemd-timesyncd`.
2. If chronyd keeps its wrong rate, restart WSL with `wsl --shutdown` from Windows while timesyncd stays stopped, so the root chronyd relearns without the competing stepper. Then repeat the 20-minute measurement. Postgres data is on its volume, and the Dev Container is reopened afterwards.
3. If stable, make the change persistent with `sudo systemctl disable systemd-timesyncd`. WSL already keeps Linux time aligned with Windows. Separately, restoring Windows automatic time synchronization would fix the ~0.5 s absolute UTC error; that needs administrator rights and does not by itself fix the rate.
4. Acceptance follows the plan above: paired calendar and elapsed time within 1 s throughout a 20-minute window, a long receipt such as `verify:foundation` passing with exact timing, and a re-check after sleep/wake.

## Controlled test step 1 — 2026-10-19 UTC

Recorded 2026-10-19T01:54:56.958Z (CHG-20261019-001) by the Claude Code agent (architect/QA reviewer role), as admin work assigned by the Director. The only change was made by the Director: Ubuntu's `systemd-timesyncd` was stopped at 2026-10-19T00:58:41Z (systemd's inactive timestamp). It is still enabled, so it will start again the next time WSL starts. Chronyd, Docker, WSL and Windows were not touched.

### Result

The second step of each pair disappeared at once, and chronyd settled within about 15 minutes. No WSL restart was needed, so plan step 2 was skipped. The host settle logger read the same kernel clocks read-only (calendar, monotonic and raw every 0.1 s; `adjtimex` without changes every 15 s) for 1,200 s from 00:59:33Z:

| Minutes after the stop | Measured correction (monotonic against raw, per 15 s) | chronyd tick | Calendar step at each Docker/WSL sync (every ~29.8 s) |
|---|---|---|---|
| 1–9 | swinging between −0.2% and +2.9% | mostly 10274, jumping between 9418 and 10372 | −660.6 ms, falling to about −200 ms |
| 9–15 | −0.03% to +0.6% | 10001–10070 | −145.8 ms, falling to −5.4 ms |
| 15–21 | −17 to +302 ppm; the last six intervals 42–55 ppm | 10000–10003, then steady at 10001 | none above 5 ms |

All 29 recorded steps were single, backward and shrinking; none followed 0.1–0.2 s later, as timesyncd's step had. Chronyd's estimated error fell from 49,691 µs to 99 µs. This confirms the inferred cause: timesyncd kept stepping the clock to a second reference (Internet time, about 0.54 s from Windows time), and that kept chronyd's rate estimate wrong. With one reference, chronyd converged.

Receipts:

- **RUN-20261019-001** (container, 120 s): the read-only probe passed with exact timing. Tick 10001, applied correction +49 to +58 ppm, no step above 50 ms, calendar minus monotonic −6.4 ms.
- **RUN-20261019-002** (local isolated BOOT-03 pipeline, `scripts/ci-local.py`): passed every stage in 461.7 s with exact timing. That covers frozen install, 408 Node tests in 20 suites, the upstream engine suite (406 passed, 1 skipped), 2 injection tests, Python tooling, disposable PostgreSQL 18 provisioning, 11 Chromium tests, both secret scans and cleanup. Its log contains no credential patterns. Earlier local isolated runs RUN-20261012-089/091, RUN-20261013-011/113 and RUN-20261014-051 failed `clock_changed`; the last local isolated pass with exact timing was RUN-20261012-043. This receipt covers the current source (main 4dea392 code plus documentation) and does not qualify earlier sources retroactively.

A second 1,200 s window from 01:34:25Z, taken after the pipeline run, met the plan's 20-minute criterion. No calendar step exceeded 5 ms, calendar minus monotonic totalled −52.0 ms against the 1 s limit, the tick stayed at 10001, and the measured correction was 27–50 ppm (median 42). Two of the plan's three acceptance checks are now met: the 20-minute window and a long receipt with exact timing. The sleep/wake re-check is still open.

### Still open

1. **Persistence (Director, Ubuntu password):** `sudo systemctl disable systemd-timesyncd`. Until then, a WSL restart or PC reboot starts timesyncd again and the problem returns.
2. **Sleep/wake re-check:** after the PC next sleeps, Docker/WSL should make one large step to Windows time while chronyd keeps its rate. Re-measure with the same logger.
3. **Absolute UTC (optional, Windows administrator):** Linux now follows Windows, which is about 0.54 s from Internet time because Windows Time is Stopped/Manual. This does not affect elapsed times or receipts. Turning Windows automatic time synchronization back on would fix it; re-run the logger afterwards to confirm Windows' corrections do not disturb chronyd.

The clock guard, the earlier failed receipts and the hosted-CI merge gate are unchanged.

### Persistence — 2026-10-19 UTC

Recorded 2026-10-19T05:49:12.691Z (CHG-20261019-002). The Director ran `sudo systemctl disable systemd-timesyncd` (plan step 3). At 2026-10-19T02:40:06Z the service was disabled and inactive. A 60 s read-only probe then showed tick 10001, a +35.6 ppm correction, no step and calendar minus monotonic −2.3 ms. At about 05:50Z, a second 60 s probe showed tick 10000, no step and −3.3 ms, with no suspend recorded by the kernel (boot time minus monotonic 0 s). The fix now survives a WSL restart or reboot. Still open: the sleep/wake re-check, and optionally re-enabling Windows time synchronization.
