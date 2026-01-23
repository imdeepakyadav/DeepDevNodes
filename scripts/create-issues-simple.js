#!/usr/bin/env node

/**
 * GitHub Issues Creator Script
 * 
 * This script helps create GitHub issues from the predefined issue list.
 * It can be used with the GitHub CLI (gh) to batch create issues.
 * 
 * Usage:
 * 1. Install GitHub CLI: https://cli.github.com/
 * 2. Authenticate: gh auth login
 * 3. Run: node scripts/create-issues.js
 */

const issues = [
  // High Priority Issues
  {
    title: "Add GraphQL Support",
    body: `## Description
Implement GraphQL support alongside the existing REST API to provide more flexible data querying capabilities.

## Acceptance Criteria
- [ ] Set up GraphQL server with Apollo Server or similar
- [ ] Create GraphQL schemas for all existing REST endpoints
- [ ] Implement resolvers for all data sources (countries, space, utilities, etc.)
- [ ] Add GraphQL playground/explorer interface
- [ ] Update documentation with GraphQL examples
- [ ] Maintain backward compatibility with REST API
- [ ] Add tests for GraphQL endpoints

## Additional Notes
This will significantly improve the developer experience by allowing clients to request exactly the data they need.

## Related
- Roadmap item from README.md
- High priority enhancement`,
    labels: ["enhancement", "high-priority", "feature", "graphql"],
    milestone: null,
    assignees: []
  },

  {
    title: "Implement API Versioning",
    body: `## Description
Implement proper API versioning strategy to ensure backward compatibility and smooth migration paths for API consumers.

## Acceptance Criteria
- [ ] Choose versioning strategy (URL path, header, or query parameter)
- [ ] Implement version routing middleware
- [ ] Create v1 namespace for existing endpoints
- [ ] Set up v2 namespace for future enhancements
- [ ] Add version detection and routing logic
- [ ] Update Swagger documentation to support multiple versions
- [ ] Create migration guide for developers
- [ ] Add deprecation warnings for old versions
- [ ] Implement version-specific response formats

## Additional Notes
Recommended approach: URL path versioning (e.g., /api/v1/countries, /api/v2/countries)

## Related
- Roadmap item from README.md
- High priority enhancement`,
    labels: ["enhancement", "high-priority", "breaking-change", "api-versioning"],
    milestone: null,
    assignees: []
  },

  {
    title: "Add Comprehensive Test Suite",
    body: `## Description
Implement a comprehensive test suite covering unit tests, integration tests, and API endpoint tests to improve code quality and reliability.

## Acceptance Criteria
- [ ] Set up Jest testing framework properly
- [ ] Create unit tests for all controllers
- [ ] Create unit tests for all utility functions
- [ ] Add integration tests for database operations
- [ ] Create API endpoint tests using supertest
- [ ] Add test coverage reporting
- [ ] Set up test CI/CD pipeline
- [ ] Add tests for error handling scenarios
- [ ] Create mock data for consistent testing
- [ ] Achieve minimum 80% code coverage

## Additional Notes
Currently Jest is listed in devDependencies but tests are not properly set up. Need to install dependencies and create test structure.

## Related
- High priority technical debt
- Testing infrastructure`,
    labels: ["testing", "high-priority", "technical-debt"],
    milestone: null,
    assignees: []
  },

  {
    title: "Improve Error Handling",
    body: `## Description
Implement consistent error handling across all API endpoints with proper HTTP status codes, error messages, and logging.

## Acceptance Criteria
- [ ] Create centralized error handling middleware
- [ ] Implement consistent error response format
- [ ] Add proper HTTP status codes for all error scenarios
- [ ] Implement request validation with meaningful error messages
- [ ] Add comprehensive logging for errors
- [ ] Create custom error classes for different error types
- [ ] Add error monitoring and alerting
- [ ] Update API documentation with error response examples
- [ ] Implement graceful degradation for external API failures
- [ ] Add retry logic for transient errors

## Additional Notes
Current error handling is inconsistent across different endpoints. Need to standardize the approach.

## Related
- High priority bug fix
- API reliability`,
    labels: ["bug", "enhancement", "high-priority", "error-handling"],
    milestone: null,
    assignees: []
  },

  {
    title: "Add API Analytics and Monitoring",
    body: `## Description
Implement comprehensive API analytics and monitoring to track usage patterns, performance metrics, and system health.

## Acceptance Criteria
- [ ] Implement request/response logging middleware
- [ ] Add performance metrics collection (response time, throughput)
- [ ] Create usage analytics dashboard
- [ ] Set up health check endpoints with detailed status
- [ ] Add rate limiting monitoring and alerts
- [ ] Implement API key usage tracking
- [ ] Create performance monitoring alerts
- [ ] Add database connection monitoring
- [ ] Implement custom metrics for business logic
- [ ] Set up log aggregation and analysis

## Additional Notes
This will help understand API usage patterns and identify performance bottlenecks.

## Related
- High priority monitoring
- Analytics`,
    labels: ["enhancement", "monitoring", "high-priority", "analytics"],
    milestone: null,
    assignees: []
  },

  // Medium Priority Issues
  {
    title: "Create SDKs for Popular Languages",
    body: `## Description
Create official SDKs for popular programming languages to make it easier for developers to integrate with the API.

## Acceptance Criteria
- [ ] Create JavaScript/TypeScript SDK with npm package
- [ ] Create Python SDK with pip package
- [ ] Create Java SDK with Maven package
- [ ] Create Go SDK with Go modules
- [ ] Add comprehensive documentation for each SDK
- [ ] Implement proper error handling in SDKs
- [ ] Add authentication support in SDKs
- [ ] Create usage examples for each SDK
- [ ] Set up automated testing for SDKs
- [ ] Publish SDKs to respective package managers

## Additional Notes
Start with JavaScript/TypeScript and Python as they are most commonly used for API integration.

## Related
- Medium priority enhancement
- Developer experience`,
    labels: ["enhancement", "sdk", "medium-priority"],
    milestone: null,
    assignees: []
  },

  {
    title: "Add Webhook Notifications",
    body: `## Description
Implement webhook notifications to allow users to receive real-time updates when data changes or specific events occur.

## Acceptance Criteria
- [ ] Design webhook event system architecture
- [ ] Implement webhook registration endpoint
- [ ] Add webhook delivery mechanism with retry logic
- [ ] Create webhook signature verification
- [ ] Add webhook event types (data updates, system alerts)
- [ ] Implement webhook management endpoints (list, update, delete)
- [ ] Add webhook delivery status tracking
- [ ] Create webhook testing tools
- [ ] Add webhook documentation and examples
- [ ] Implement webhook rate limiting

## Additional Notes
Consider events like: data refresh completed, API rate limits reached, system maintenance notifications.

## Related
- Medium priority feature
- Real-time notifications`,
    labels: ["enhancement", "feature", "medium-priority", "webhooks"],
    milestone: null,
    assignees: []
  },

  // Good First Issues
  {
    title: "Improve Documentation",
    body: `## Description
Enhance the existing documentation with better examples, tutorials, and API reference improvements.

## Acceptance Criteria
- [ ] Add more detailed API examples for each endpoint
- [ ] Create step-by-step tutorial for beginners
- [ ] Improve Swagger/OpenAPI documentation
- [ ] Add troubleshooting guide
- [ ] Create FAQ section
- [ ] Add more code examples in different languages
- [ ] Improve README.md structure and clarity
- [ ] Add video tutorials or demos
- [ ] Create developer onboarding guide
- [ ] Fix any broken links or outdated information

## Additional Notes
Great for first-time contributors. Documentation improvements are always welcome!

## Related
- Good first issue
- Documentation`,
    labels: ["documentation", "good-first-issue", "help-wanted"],
    milestone: null,
    assignees: []
  },

  {
    title: "Add More Test Cases",
    body: `## Description
Expand the existing test coverage by adding more test cases for edge cases and error scenarios.

## Acceptance Criteria
- [ ] Add test cases for API endpoint edge cases
- [ ] Create tests for error handling scenarios
- [ ] Add tests for query parameter validation
- [ ] Create tests for rate limiting behavior
- [ ] Add tests for data validation functions
- [ ] Create mock tests for external API calls
- [ ] Add performance tests for key endpoints
- [ ] Create tests for utility functions
- [ ] Add tests for middleware functions
- [ ] Improve existing test assertions

## Additional Notes
Good introduction to the codebase. Look for functions without tests or incomplete test coverage.

## Related
- Good first issue
- Testing`,
    labels: ["testing", "good-first-issue", "help-wanted"],
    milestone: null,
    assignees: []
  },

  {
    title: "Fix Typos and Grammar Issues",
    body: `## Description
Review all documentation, comments, and user-facing text for typos, grammar issues, and clarity improvements.

## Acceptance Criteria
- [ ] Review README.md for typos and grammar
- [ ] Check CONTRIBUTING.md for clarity and correctness
- [ ] Review API response messages for grammar
- [ ] Check code comments for typos
- [ ] Review Swagger documentation text
- [ ] Check error messages for clarity
- [ ] Review package.json description and keywords
- [ ] Check all markdown files for formatting issues
- [ ] Review log messages for clarity
- [ ] Verify consistency in terminology usage

## Additional Notes
Perfect first contribution! Helps improve overall project quality and user experience.

## Related
- Good first issue
- Documentation quality`,
    labels: ["documentation", "good-first-issue", "easy"],
    milestone: null,
    assignees: []
  }
];

// Function to create issue using GitHub CLI
function createIssueCommand(issue) {
  const labels = issue.labels.join(',');
  const title = issue.title.replace(/"/g, '\\"');
  const body = issue.body.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  
  return `gh issue create --title "${title}" --body "${body}" --label "${labels}"`;
}

// Function to display all issues as GitHub CLI commands
function displayCommands() {
  console.log('# GitHub Issues Creation Commands\n');
  console.log('# Run these commands one by one to create all issues:\n');
  
  issues.forEach((issue, index) => {
    console.log(`# Issue ${index + 1}: ${issue.title}`);
    console.log(createIssueCommand(issue));
    console.log('');
  });
  
  console.log(`# Total issues to create: ${issues.length}`);
}

// Main execution
displayCommands();