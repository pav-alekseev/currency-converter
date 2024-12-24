import { defaults } from 'jest-config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};