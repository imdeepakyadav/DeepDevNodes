# 🤝 Contributing to deepdevnodes API

Thank you for your interest in contributing to deepdevnodes API! We welcome contributions from developers of all skill levels. This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Adding New APIs](#adding-new-apis)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm or yarn** - Package manager
- **Git** - Version control system
- **Code editor** - VS Code recommended

### Local Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/yourusername/deepdevnodes.git
   cd deepdevnodes
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **Verify installation:**
   - API available at: `http://localhost:3000`
   - Documentation at: `http://localhost:3000/docs`
   - Health check at: `http://localhost:3000/health`

## 🔄 Development Workflow

### 1. Choose an Issue

- Check [GitHub Issues](https://github.com/imdeepakyadav/deepdevnodes/issues) for open tasks
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-number-description
```

### 3. Make Your Changes

- Write clean, well-documented code
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run the test suite
node test-api.js

# Test specific endpoints
curl "http://localhost:3000/api/your-endpoint"
```

### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new API endpoint for weather data"
```

### 6. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

## 🏗️ Project Structure

```
deepdevnodes/
├── src/
│   ├── controllers/     # API controllers
│   ├── routes/         # Route definitions
│   ├── data/           # JSON data files
│   ├── utils/          # Utility functions
│   ├── middlewares/    # Express middlewares
│   ├── config/         # Configuration files
│   ├── services/       # Business logic services
│   ├── dataUpdater.js  # Data update automation
│   ├── server.js       # Server entry point
│   └── app.js          # Express app setup
├── docs/               # Documentation files
├── tests/              # Test files
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── README.md           # Main documentation
├── LICENSE             # License file
└── CONTRIBUTING.md     # This file
```

## ➕ Adding New APIs

### Step-by-Step Guide

1. **Plan Your API:**
   - Define the purpose and use cases
   - Identify data sources and requirements
   - Plan the endpoint structure and parameters

2. **Create Data File:**

   ```javascript
   // src/data/yourApiData.json
   [
     {
       id: 1,
       name: 'Sample Data',
       description: 'Sample description',
     },
   ];
   ```

3. **Create Controller:**

   ```javascript
   // src/controllers/yourApiController.js
   import { createResponse } from '../utils/apiHelpers.js';

   export const getYourData = (req, res) => {
     try {
       // Your logic here
       res.json(createResponse(data));
     } catch (error) {
       res.status(500).json(createErrorResponse('Error message'));
     }
   };
   ```

4. **Create Routes:**

   ```javascript
   // src/routes/yourApi.js
   import express from 'express';
   import { getYourData } from '../controllers/yourApiController.js';

   const router = express.Router();

   router.get('/', getYourData);

   export default router;
   ```

5. **Register Routes:**

   ```javascript
   // src/app.js
   import yourApiRoutes from './routes/yourApi.js';

   // Add this line with other route registrations
   app.use('/api/your-api', yourApiRoutes);
   ```

6. **Add Swagger Documentation:**

   ```javascript
   /**
    * @swagger
    * /api/your-api:
    *   get:
    *     summary: Get your API data
    *     tags: [Your API]
    *     responses:
    *       200:
    *         description: Success
    */
   ```

7. **Update README.md:**
   - Add API documentation section
   - Include examples and parameters
   - Update table of contents

8. **Add Tests:**
   ```javascript
   // Test your new endpoint
   const response = await fetch('http://localhost:3000/api/your-api');
   const data = await response.json();
   ```

### API Design Guidelines

- **RESTful Design:** Follow REST principles
- **Consistent Responses:** Use the standard response format
- **Error Handling:** Implement proper error responses
- **Documentation:** Add comprehensive Swagger docs
- **Validation:** Validate input parameters
- **Rate Limiting:** Respect existing rate limits

## 💅 Code Style Guidelines

### JavaScript/TypeScript

- Use **ES6+** features (arrow functions, async/await, etc.)
- Use **const** and **let** instead of **var**
- Use **template literals** for string interpolation
- Use **destructuring** for object/array access
- Use **spread/rest operators** appropriately

### Naming Conventions

- **Files:** kebab-case (e.g., `userController.js`)
- **Functions:** camelCase (e.g., `getUserData`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Classes:** PascalCase (e.g., `UserService`)

### Code Structure

```javascript
// Good: Clear structure with JSDoc
/**
 * Get user data by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation
    if (!id) {
      return res.status(400).json(createErrorResponse('ID is required'));
    }

    // Business logic
    const user = await getUserFromDatabase(id);

    // Response
    res.json(createResponse(user));
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json(createErrorResponse('Internal server error'));
  }
};
```

### Best Practices

- **Error Handling:** Always wrap async code in try-catch
- **Input Validation:** Validate all user inputs
- **Logging:** Use console.log for debugging (will be removed in production)
- **Comments:** Add comments for complex logic
- **Modularity:** Keep functions small and focused
- **DRY Principle:** Don't repeat yourself

## 🧪 Testing

### Running Tests

```bash
# Run all API tests
node test-api.js

# Test specific endpoints manually
curl "http://localhost:3000/api/test-endpoint"
```

### Writing Tests

When adding new features, include tests:

1. **Unit Tests:** Test individual functions
2. **Integration Tests:** Test API endpoints
3. **Manual Tests:** Document manual testing steps

### Test Coverage

Aim for good test coverage:

- Happy path scenarios
- Error scenarios
- Edge cases
- Input validation

## 📚 Documentation

### Code Documentation

- Use **JSDoc** comments for all functions
- Document parameters and return types
- Explain complex logic with comments

### API Documentation

- Update **README.md** with new API details
- Add **Swagger annotations** to routes
- Include examples and error responses
- Document rate limits and authentication

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes
- **refactor:** Code refactoring
- **test:** Adding tests
- **chore:** Maintenance tasks

### Examples

```bash
git commit -m "feat: add weather API endpoint"
git commit -m "fix: resolve memory leak in data updater"
git commit -m "docs: update API documentation for v2.0"
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch:**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests:**

   ```bash
   node test-api.js
   ```

3. **Check code style:**
   - Follow the established patterns
   - Ensure consistent formatting

### PR Template

When creating a Pull Request, include:

- **Title:** Clear, descriptive title
- **Description:** Detailed explanation of changes
- **Screenshots:** If UI changes are involved
- **Testing:** How to test the changes
- **Breaking Changes:** If any breaking changes

### Review Process

1. **Automated Checks:** CI/CD pipeline runs
2. **Code Review:** Team members review code
3. **Testing:** Changes are tested
4. **Approval:** PR is approved and merged

## 🌐 Community

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** General discussions and Q&A
- **Pull Requests:** Code contributions

### Getting Help

- Check existing issues and documentation first
- Create detailed bug reports with reproduction steps
- Ask questions in GitHub Discussions

### Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Mention in release notes
- Special contributor badges

## 🎯 Areas for Contribution

### High Priority

- [ ] Add GraphQL support
- [ ] Implement API versioning
- [ ] Add comprehensive test suite
- [ ] Improve error handling
- [ ] Add API analytics

### Medium Priority

- [ ] Create SDKs for popular languages
- [ ] Add webhook notifications
- [ ] Implement advanced caching
- [ ] Add real-time data streaming
- [ ] Create mobile app companion

### Good First Issues

- [ ] Improve documentation
- [ ] Add more test cases
- [ ] Fix typos and grammar
- [ ] Update dependencies
- [ ] Add code comments

## 📞 Support

Need help contributing? Reach out:

- 📧 **Email:** imdeepakyadav@example.com
- 💬 **GitHub Issues:** [Create an issue](https://github.com/imdeepakyadav/deepdevnodes/issues)
- 💭 **Discussions:** [Start a discussion](https://github.com/imdeepakyadav/deepdevnodes/discussions)

## 🙏 Recognition

We appreciate all contributions, big and small! Every contribution helps make deepdevnodes better for the entire developer community.

---

**Happy contributing! 🎉**
