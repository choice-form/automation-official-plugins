// @ts-ignore - SDK 在构建时可用
import { ActionNode } from "@choiceform/automation-sdk";
// @ts-ignore - SDK 在构建时可用
import type {
  PluginExecutionContext,
  ExecutionResult,
  PluginManifest,
  PortConfig,
  NodeConfigSchema,
} from "@choiceform/automation-sdk";

interface GitHubInputs {
  token?: string;
  action?: string;
  owner?: string;
  repo?: string;
  title?: string;
  body?: string;
  baseBranch?: string;
  headBranch?: string;
  labels?: string;
  assignees?: string;
  tagName?: string;
  targetCommitish?: string;
  prerelease?: boolean;
  state?: string;
  limit?: number;
}

interface GitHubApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}

/**
 * GitHub Plugin
 *
 * Interact with GitHub repositories, issues, pull requests, and more
 */
export class GitHub extends ActionNode {
  private baseUrl = "https://api.github.com";

  async setup(): Promise<void> {
    console.log("[GitHub Plugin] Setting up GitHub plugin...");
  }

  async teardown(): Promise<void> {
    console.log("[GitHub Plugin] Tearing down GitHub plugin...");
  }

  getManifest(): PluginManifest {
    return {
      name: "@choiceform/github",
      version: "1.0.1",
      description:
        "GitHub is a web-based platform for version control and collaboration. This plugin enables automation workflows to interact with GitHub repositories, issues, pull requests, and more.",
      author: "wester",
      nodeType: "@choiceform/github.action",
      automationNodeType: "action.github",
      displayName: "GitHub",
      category: "action",
      domain: "development",
      subCategory: "version-control",
      icon: "icon.png",
      tags: [
        "github",
        "action",
        "git",
        "repository",
        "issue",
        "pull-request",
        "automation",
      ],
      isPopular: true,
      sdkVersion: "^1.0.0",
      automationConfigs: {
        registry: {
          type: "action.github",
          name: "GitHub",
          description: "Interact with GitHub repositories",
          categoryId: "action",
          subCategoryId: "development",
          icon: "icon.png",
          tags: ["github", "git", "repository", "issue", "pull-request"],
          isPopular: true,
        },
        ports: {
          ports: [
            {
              id: "input",
              type: "input",
              label: "Input",
              allowMultiple: false,
            },
            {
              id: "success",
              type: "output",
              label: "Success",
              allowMultiple: true,
            },
            {
              id: "error",
              type: "output",
              label: "Error",
              allowMultiple: true,
            },
          ],
        },
        toolbar: {
          position: "top",
          buttons: ["run", "delete", "activate", "more"],
          showContent: true,
        },
        layout: {
          width: 200,
          minHeight: 120,
          showContent: true,
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  getPortConfig(): PortConfig {
    return {
      ports: [
        {
          id: "input",
          type: "input",
          label: "Input",
          allowMultiple: false,
        },
        {
          id: "success",
          type: "output",
          label: "Success",
          allowMultiple: true,
        },
        {
          id: "error",
          type: "output",
          label: "Error",
          allowMultiple: true,
        },
      ],
    };
  }

  getConfigSchema(): NodeConfigSchema {
    return {
      fields: [
        {
          key: "token",
          type: "string",
          label: "Personal Access Token",
          description: "GitHub personal access token for authentication",
          required: true,
          sensitive: true,
          placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx",
          validation: {
            pattern: "^(ghp_|github_pat_).*",
            message: "Must be a valid GitHub personal access token",
          },
          ui: {
            width: "full",
            group: "authentication",
            order: 1,
          },
        },
        {
          key: "action",
          type: "select",
          label: "Action",
          description: "Select the GitHub action to perform",
          required: true,
          options: [
            {
              value: "create-issue",
              label: "Create Issue",
            },
            {
              value: "create-pr",
              label: "Create Pull Request",
            },
            {
              value: "get-repo-info",
              label: "Get Repository Info",
            },
            {
              value: "list-issues",
              label: "List Issues",
            },
            {
              value: "list-prs",
              label: "List Pull Requests",
            },
            {
              value: "create-release",
              label: "Create Release",
            },
          ],
          ui: {
            width: "medium",
            group: "operation",
            order: 2,
          },
        },
        // 其他字段配置与 manifest 中保持一致
      ],
      groups: {
        authentication: {
          label: "Authentication",
          description: "GitHub API authentication",
        },
        operation: {
          label: "Operation",
          description: "Select the action to perform",
        },
        repository: {
          label: "Repository",
          description: "Target repository information",
        },
        content: {
          label: "Content",
          description: "Main content for the operation",
        },
        pullRequest: {
          label: "Pull Request Settings",
          description: "Settings specific to pull requests",
          collapsed: true,
        },
        metadata: {
          label: "Metadata",
          description: "Additional metadata",
          collapsed: true,
        },
        release: {
          label: "Release Settings",
          description: "Settings specific to releases",
          collapsed: true,
        },
        filters: {
          label: "Filters",
          description: "Filter options for listing operations",
          collapsed: true,
        },
      },
    };
  }

  private async makeGitHubRequest(
    endpoint: string,
    options: RequestInit,
    token: string
  ): Promise<Response> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = (await response.json()) as GitHubApiError;
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    return response;
  }

  private parseLabels(labels?: string): string[] {
    if (!labels) return [];
    return labels
      .split(",")
      .map((label) => label.trim())
      .filter(Boolean);
  }

  private parseAssignees(assignees?: string): string[] {
    if (!assignees) return [];
    return assignees
      .split(",")
      .map((assignee) => assignee.trim())
      .filter(Boolean);
  }

  async execute(
    inputs: Record<string, unknown>,
    context: PluginExecutionContext
  ): Promise<ExecutionResult> {
    try {
      const githubInputs = inputs as GitHubInputs;
      const { token, action, owner, repo } = githubInputs;

      // 验证必需参数
      if (!token) {
        throw new Error("GitHub personal access token is required");
      }

      if (!action) {
        throw new Error("Action is required");
      }

      if (!owner || !repo) {
        throw new Error("Repository owner and name are required");
      }

      context.log("info", `Executing GitHub action: ${action}`, {
        owner,
        repo,
        action,
      });

      let result: Record<string, unknown> = {};

      switch (action) {
        case "create-issue":
          result = await this.createIssue(githubInputs, context, token);
          break;
        case "create-pr":
          result = await this.createPullRequest(githubInputs, context, token);
          break;
        case "get-repo-info":
          result = await this.getRepositoryInfo(githubInputs, context, token);
          break;
        case "list-issues":
          result = await this.listIssues(githubInputs, context, token);
          break;
        case "list-prs":
          result = await this.listPullRequests(githubInputs, context, token);
          break;
        case "create-release":
          result = await this.createRelease(githubInputs, context, token);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";

      try {
        context.log("error", "GitHub operation failed", {
          error: errorMessage,
        });
      } catch (logError) {
        // 忽略日志错误
      }

      return {
        success: false,
        error: errorMessage,
        data: {
          error: errorMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  private async createIssue(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const { owner, repo, title, body, labels, assignees } = inputs;

    if (!title) {
      throw new Error("Issue title is required");
    }

    const payload = {
      title,
      body: body || "",
      labels: this.parseLabels(labels),
      assignees: this.parseAssignees(assignees),
    };

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}/issues`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );

    const issue = (await response.json()) as any;

    context.log("info", "Issue created successfully", {
      number: issue.number,
      url: issue.html_url,
    });

    return {
      action: "create-issue",
      issue: {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        created_at: issue.created_at,
        user: issue.user.login,
      },
    };
  }

  private async createPullRequest(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const {
      owner,
      repo,
      title,
      body,
      baseBranch,
      headBranch,
      labels,
      assignees,
    } = inputs;

    if (!title) {
      throw new Error("Pull request title is required");
    }

    if (!baseBranch || !headBranch) {
      throw new Error("Base branch and head branch are required");
    }

    const payload = {
      title,
      body: body || "",
      base: baseBranch,
      head: headBranch,
    };

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}/pulls`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );

    const pr = (await response.json()) as any;

    // 添加标签和分配人员
    if (labels || assignees) {
      const updatePayload: Record<string, unknown> = {};
      if (labels) updatePayload.labels = this.parseLabels(labels);
      if (assignees) updatePayload.assignees = this.parseAssignees(assignees);

      await this.makeGitHubRequest(
        `/repos/${owner}/${repo}/issues/${pr.number}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatePayload),
        },
        token
      );
    }

    context.log("info", "Pull request created successfully", {
      number: pr.number,
      url: pr.html_url,
    });

    return {
      action: "create-pr",
      pullRequest: {
        id: pr.id,
        number: pr.number,
        title: pr.title,
        state: pr.state,
        url: pr.html_url,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        user: pr.user.login,
        base: pr.base.ref,
        head: pr.head.ref,
      },
    };
  }

  private async getRepositoryInfo(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const { owner, repo } = inputs;

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}`,
      { method: "GET" },
      token
    );

    const repoData = (await response.json()) as any;

    context.log("info", "Repository info retrieved", {
      name: repoData.full_name,
      stars: repoData.stargazers_count,
    });

    return {
      action: "get-repo-info",
      repository: {
        id: repoData.id,
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description,
        private: repoData.private,
        url: repoData.html_url,
        clone_url: repoData.clone_url,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        language: repoData.language,
        stargazers_count: repoData.stargazers_count,
        watchers_count: repoData.watchers_count,
        forks_count: repoData.forks_count,
        open_issues_count: repoData.open_issues_count,
        default_branch: repoData.default_branch,
        topics: repoData.topics,
      },
    };
  }

  private async listIssues(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const { owner, repo, state = "open", limit = 30 } = inputs;

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}/issues?state=${state}&per_page=${limit}`,
      { method: "GET" },
      token
    );

    const issues = (await response.json()) as any[];

    context.log("info", `Retrieved ${issues.length} issues`, {
      state,
      count: issues.length,
    });

    return {
      action: "list-issues",
      issues: issues.map((issue: Record<string, unknown>) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        user: (issue.user as Record<string, unknown>).login,
        labels: (issue.labels as Array<Record<string, unknown>>).map(
          (l) => l.name
        ),
      })),
      count: issues.length,
      state,
    };
  }

  private async listPullRequests(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const { owner, repo, state = "open", limit = 30 } = inputs;

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}/pulls?state=${state}&per_page=${limit}`,
      { method: "GET" },
      token
    );

    const prs = (await response.json()) as any[];

    context.log("info", `Retrieved ${prs.length} pull requests`, {
      state,
      count: prs.length,
    });

    return {
      action: "list-prs",
      pullRequests: prs.map((pr: Record<string, unknown>) => ({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        state: pr.state,
        url: pr.html_url,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        user: (pr.user as Record<string, unknown>).login,
        base: (pr.base as Record<string, unknown>).ref,
        head: (pr.head as Record<string, unknown>).ref,
      })),
      count: prs.length,
      state,
    };
  }

  private async createRelease(
    inputs: GitHubInputs,
    context: PluginExecutionContext,
    token: string
  ): Promise<Record<string, unknown>> {
    const {
      owner,
      repo,
      tagName,
      title,
      body,
      targetCommitish = "main",
      prerelease = false,
    } = inputs;

    if (!tagName) {
      throw new Error("Tag name is required for creating a release");
    }

    const payload = {
      tag_name: tagName,
      name: title || tagName,
      body: body || "",
      target_commitish: targetCommitish,
      prerelease,
      draft: false,
    };

    const response = await this.makeGitHubRequest(
      `/repos/${owner}/${repo}/releases`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );

    const release = (await response.json()) as any;

    context.log("info", "Release created successfully", {
      tag: release.tag_name,
      url: release.html_url,
    });

    return {
      action: "create-release",
      release: {
        id: release.id,
        tag_name: release.tag_name,
        name: release.name,
        prerelease: release.prerelease,
        url: release.html_url,
        created_at: release.created_at,
        published_at: release.published_at,
        author: release.author.login,
      },
    };
  }
}

// 导出插件实例
export default new GitHub();
