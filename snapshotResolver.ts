import type { SnapshotResolver } from "jest-snapshot";

const snapshotResolver: SnapshotResolver = {
  resolveSnapshotPath: (
    testPath: string,
    snapshotExtension: string
  ): string => {
    // Stores the snapshot next to the test file, replacing `.test.tsx` with `.test.tsx.snap`
    return testPath + snapshotExtension;
  },
  resolveTestPath: (
    snapshotFilePath: string,
    snapshotExtension: string
  ): string => {
    // Reverts the snapshot file path back to the test file path
    return snapshotFilePath.slice(0, -snapshotExtension.length);
  },
  testPathForConsistencyCheck: "some/example.test.tsx",
};

export default snapshotResolver;
