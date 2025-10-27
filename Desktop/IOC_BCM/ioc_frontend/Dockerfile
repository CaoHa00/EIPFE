# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install with specific flags
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Clear Next.js cache before building
RUN rm -rf .next

# Build with increased memory (if needed)
# ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/site-config.json ./site-config.json

EXPOSE 3000

CMD ["npm", "start"]