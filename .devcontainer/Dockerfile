FROM node:24.21.0-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       bash ca-certificates curl git openssh-client postgresql-client \
       python3 python3-yaml ripgrep \
       libglib2.0-0 libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
       libcups2 libdbus-1-3 libx11-6 libxcb1 libxext6 libxkbcommon0 \
       libasound2 libgbm1 libcairo2 libpango-1.0-0 libatspi2.0-0 \
       libxcomposite1 libxdamage1 libxfixes3 libxrandr2 fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --global --ignore-scripts --no-audit --no-fund pnpm@10.33.0 \
    && test "$(node --version)" = "v24.21.0" \
    && test "$(pnpm --version)" = "10.33.0"

# Bun is qualification tooling only; application artifacts run on Node.
RUN --mount=type=cache,id=lorcana-bun-v1.4.2,target=/var/cache/lorcana-bun,sharing=locked \
    case "$(dpkg --print-architecture)" in \
      amd64) task_bun_arch=x64; task_bun_sha=36368faef7527875d5ffa52e53cd48021741f2a83eb6208a8dd64068d422a913 ;; \
      arm64) task_bun_arch=aarch64; task_bun_sha=54328bbc2d9c8e0c9f892c544d66c57a83b84139e34909e5ee81758f1ac8fda7 ;; \
      *) exit 1 ;; \
    esac \
    && task_bun_archive="/var/cache/lorcana-bun/bun-linux-${task_bun_arch}.zip" \
    && if ! printf '%s  %s\n' "$task_bun_sha" "$task_bun_archive" | sha256sum --check --status; then \
         rm -f "$task_bun_archive" \
         && for task_bun_attempt in 1 2; do \
              if curl --fail --location --connect-timeout 30 --max-time 1800 \
                   --retry 2 --retry-delay 3 --retry-max-time 1800 --continue-at - \
                   "https://github.com/oven-sh/bun/releases/download/bun-v1.4.2/bun-linux-${task_bun_arch}.zip" -o "${task_bun_archive}.part"; then \
                if printf '%s  %s\n' "$task_bun_sha" "${task_bun_archive}.part" | sha256sum --check; then \
                  mv "${task_bun_archive}.part" "$task_bun_archive" && break; \
                fi; \
                rm -f "${task_bun_archive}.part"; \
              else \
                task_bun_status=$?; \
                case "$task_bun_status" in 22|33|36) ;; *) exit "$task_bun_status" ;; esac; \
                rm -f "${task_bun_archive}.part"; \
              fi; \
            done; \
       fi \
    && printf '%s  %s\n' "$task_bun_sha" "$task_bun_archive" | sha256sum --check \
    && python3 -c 'import sys,zipfile;z=zipfile.ZipFile(sys.argv[2]);open("/usr/local/bin/bun","wb").write(z.read("bun-linux-"+sys.argv[1]+"/bun"))' "$task_bun_arch" "$task_bun_archive" \
    && chmod 755 /usr/local/bin/bun \
    && test "$(bun --version)" = "1.4.2"

USER node
WORKDIR /workspaces/lorcana-online-tcg
CMD ["sleep", "infinity"]
