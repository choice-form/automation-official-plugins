import { GitHub } from "../src/index";

// Mock fetch
global.fetch = jest.fn();

describe("GitHub Plugin", () => {
  let plugin: GitHub;
  let mockContext: any;

  beforeEach(() => {
    plugin = new GitHub();
    mockContext = {
      log: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("setup and teardown", () => {
    it("should setup successfully", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      await plugin.setup();
      expect(consoleSpy).toHaveBeenCalledWith(
        "[GitHub Plugin] Setting up GitHub plugin..."
      );
      consoleSpy.mockRestore();
    });

    it("should teardown successfully", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      await plugin.teardown();
      expect(consoleSpy).toHaveBeenCalledWith(
        "[GitHub Plugin] Tearing down GitHub plugin..."
      );
      consoleSpy.mockRestore();
    });
  });

  describe("getManifest", () => {
    it("should return correct manifest", () => {
      const manifest = plugin.getManifest();
      expect(manifest.name).toBe("@choiceform/github");
      expect(manifest.displayName).toBe("GitHub");
      expect(manifest.category).toBe("action");
      expect(manifest.domain).toBe("development");
    });
  });

  describe("execute - create issue", () => {
    it("should create issue successfully", async () => {
      const mockIssue = {
        id: 1,
        number: 123,
        title: "Test Issue",
        state: "open",
        html_url: "https://github.com/owner/repo/issues/123",
        created_at: "2024-01-01T00:00:00Z",
        user: { login: "testuser" },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockIssue,
      });

      const inputs = {
        token: "ghp_test123",
        action: "create-issue",
        owner: "testowner",
        repo: "testrepo",
        title: "Test Issue",
        body: "Test issue body",
        labels: "bug, enhancement",
        assignees: "user1, user2",
      };

      const result = await plugin.execute(inputs, mockContext);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        action: "create-issue",
        issue: {
          id: 1,
          number: 123,
          title: "Test Issue",
          state: "open",
          url: "https://github.com/owner/repo/issues/123",
        },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/testowner/testrepo/issues",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer ghp_test123",
          }),
        })
      );
    });

    it("should handle missing title error", async () => {
      const inputs = {
        token: "ghp_test123",
        action: "create-issue",
        owner: "testowner",
        repo: "testrepo",
      };

      const result = await plugin.execute(inputs, mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Issue title is required");
    });
  });

  describe("execute - get repository info", () => {
    it("should get repository info successfully", async () => {
      const mockRepo = {
        id: 1,
        name: "testrepo",
        full_name: "testowner/testrepo",
        description: "Test repository",
        private: false,
        html_url: "https://github.com/testowner/testrepo",
        clone_url: "https://github.com/testowner/testrepo.git",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        language: "TypeScript",
        stargazers_count: 100,
        watchers_count: 50,
        forks_count: 10,
        open_issues_count: 5,
        default_branch: "main",
        topics: ["automation", "github"],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepo,
      });

      const inputs = {
        token: "ghp_test123",
        action: "get-repo-info",
        owner: "testowner",
        repo: "testrepo",
      };

      const result = await plugin.execute(inputs, mockContext);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        action: "get-repo-info",
        repository: {
          name: "testrepo",
          full_name: "testowner/testrepo",
          stargazers_count: 100,
        },
      });
    });
  });

  describe("execute - error handling", () => {
    it("should handle missing token error", async () => {
      const inputs = {
        action: "create-issue",
        owner: "testowner",
        repo: "testrepo",
      };

      const result = await plugin.execute(inputs, mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toBe("GitHub personal access token is required");
    });

    it("should handle API errors", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: async () => ({
          message: "Bad credentials",
          documentation_url: "https://docs.github.com",
        }),
      });

      const inputs = {
        token: "invalid_token",
        action: "get-repo-info",
        owner: "testowner",
        repo: "testrepo",
      };

      const result = await plugin.execute(inputs, mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain("GitHub API error");
      expect(result.error).toContain("Bad credentials");
    });
  });
});
