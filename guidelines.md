1. Make a new project's folder:

```bash
mkdir <project-name>
```

2. Initialize the project:

```bash
cd <project-name>
pnpm inti
```

3. Create a `pnpm-workspace.yaml`:

```bash
touch pnpm-workspace.yaml
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "libs/*"
```

4. Create directories:

```bash
mkdir apps libs
```

5. Create `.gitignore` with the following content:

```bash
echo -e "node_modules \nbuild \ndist \n.next \n.env \n.nx" > .gitignore
```

6. Initialize git:

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
