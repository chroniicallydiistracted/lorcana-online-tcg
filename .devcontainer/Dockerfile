FROM node:24.21.0-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       bash ca-certificates curl git openssh-client postgresql-client \
       python3 python3-yaml \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --global --ignore-scripts --no-audit --no-fund pnpm@10.33.0 \
    && test "$(node --version)" = "v24.21.0" \
    && test "$(pnpm --version)" = "10.33.0"

USER node
WORKDIR /workspaces/lorcana-online-tcg
CMD ["sleep", "infinity"]
