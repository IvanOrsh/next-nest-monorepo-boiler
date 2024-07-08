## 1. Make a new project's folder:

```bash
mkdir <project-name>
```

## 2. Initialize the project:

```bash
cd <project-name>
pnpm inti
```

## 3. Create a `pnpm-workspace.yaml`:

```bash
touch pnpm-workspace.yaml
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "libs/*"
```

## 4. Create directories:

```bash
mkdir apps libs
```

## 5. Create `.gitignore` with the following content:

```bash
echo -e "node_modules \nbuild \ndist \n.next \n.env \n.nx" > .gitignore
```

## 6. Initialize git:

```bash
git init
```

```bash
git branch -M main
```

```bash
git add .
```

```bash
git commit -m "build: initial commit"
```

## 7. Initialize apps: one for frontend and one for backend:

for frontend (for frontend, we are going to use nextjs meta framework):

```bash
cd apps
```

```bash
pnpm create next-app
```

- name: web
- everything, except for "customize the default import alias": "yes"
- "customize the default import alias": "no"

---

for backend (let's use nestjs):

If you never installed `nest` cli, you might want to install it first.

```bash
nest new api --strict --skip-git --package-manager=pnpm
```

In the command above, we’re creating a new Nestjs project named ‘api’ without initializing Git, as Git will be initialized at the root level. We’re using ‘npm’ as our package manager.

- name: api
- package manger: pnpm



## 8. Update `apps/api/package.json` and `apps/web/package.json`:


apps/api/package.json:
```json
{
  "name": "name": "@next-nest-monorepo-boiler/api",
  // ...
  "scripts": {
    "dev": "nest start --watch",
    // ...
  }
}
```

apps/web/package.json:
```json
{
  "name": "@next-nest-monorepo-boiler/web",
  // ...
  "scripts": {
    "dev": "next dev -p 3001",
    // ...
  }
}
```

## 9. `.npmrc` 

Ensure that packages within the workspace are symlinked to each other

```.npmrc
link-workspace-packages=true
```

## 10. Setting up nx:

`pnpm dlx` fetches a package from the registry without installing it as a dependency, hotloads it, and runs whatever default command binary it exposes.

Nx

```bash
pnpm dlx nx@latest init
```

To run build:

```bash
pnpm exec nx run-many --target=build
```

## 11. Setting up prettier:

```bash
pnpm add -D prettier -w
```

add to `package.json` (in the root folder) the following scripts:

```json
{
  "scripts": {
    "format": "prettier \"{apps,libs}/**/*.{ts,tsx,js,json}\" --ignore-path .gitignore",
    "format:check": "pnpm format --check",
    "format:write": "pnpm format --write"
  }
}
```

And don't forget to create `.prettierrc` with the rules of your choice.

## 12. Setting up eslint:

`package.json` (root folder), scripts:

```json
{
  "scripts": {
    "lint": "pnpm exec nx run-many --target=lint"
  }
}
```

## 13. `tsc` script - make sure you have `tsc` script in apps, libs (if you want to do type checking)

```json
{
  "scripts": {
    "tsc": "pnpm exec nx run-many --target=tsc",
  }
}
```

## 14. Validate script: combining together formatting, linting and type checking

```json
{
  "scripts": {
    "validate": "pnpm format:write && pnpm tsc && pnpm lint"
  }
}
```

## 15. Update `nx.json` to cache linking, formatting and type checking results

nx.json:

```json
{
    "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/.next, build, dist"],
      "cache": true
    },
    "lint": {
      "cache": true
    },
    "tsc": {
      "cache": true
    }
  },
}
```

## 16. Implementing pre-commits hooks with `husky`

```bash
pnpm dlx husky-init && pnpm install
```

./.husky/pre-commit:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm validate
````