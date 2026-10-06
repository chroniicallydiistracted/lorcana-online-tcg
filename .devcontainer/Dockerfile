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

USER node
WORKDIR /workspaces/lorcana-online-tcg
CMD ["sleep", "infinity"]
