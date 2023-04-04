export default {
  "*.{tf,tfvars,tpl}": (filenames) => filenames.map((filename) => `terraform fmt '${filename}'`),
  "package.json": "sort-package-json",
  "*.ts": [
    "prettier --write",
    "yarn lint"
  ]
}
