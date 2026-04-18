import path from 'node:path';
import { config } from 'dotenv';
import type { NextConfig } from 'next';

config({ path: path.resolve(import.meta.dirname, '../../.env') });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
