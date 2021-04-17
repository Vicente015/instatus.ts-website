import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs']);
export default new DocsSource({
  id: 'main',
  name: 'Main library',
  global: 'Instatus',
  repo: 'Vicente015/instatus.ts',
  defaultTag: 'main',
  branchFilter: branch =>
    !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
  tagFilter: tag => tag === 'main' || semver.gt(tag.replace(/^v/, ''), '1.0.0'),
});
