# Documentation Development

This directory contains the documentation for PixelPress, built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/).

## Local Development

### Prerequisites

- Python 3.x
- pip

### Setup

1. Create a virtual environment (recommended):
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Building the Documentation

To build the documentation:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

### Development Server

To run a local development server with live reloading:

```bash
mkdocs serve
```

The documentation will be available at http://127.0.0.1:8000/

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow:
1. **Build**: Builds the documentation on every push and PR
2. **Deploy**: Automatically deploys to GitHub Pages only when merged to `main`

## Adding New Pages

1. Create a new Markdown file in the `docs/` directory
2. Add the page to the `nav` section in `mkdocs.yml`
3. Commit and push your changes

## Configuration

The site configuration is in `mkdocs.yml` at the root of the repository. This includes:
- Site metadata
- Theme configuration
- Navigation structure
- Markdown extensions
- Plugins
