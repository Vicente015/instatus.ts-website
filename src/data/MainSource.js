import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs']);
export default new DocsSource({
  id: 'main',
  name: 'Main library',
  global: 'instatus.ts',
  repo: 'Vicente015/instatus.ts',
  defaultTag: 'latest',
  branchFilter: branch =>
    !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
  tagFilter: tag => tag === 'latest' || semver.gt(tag.replace(/^v/, ''), '1.0.0'),
});
