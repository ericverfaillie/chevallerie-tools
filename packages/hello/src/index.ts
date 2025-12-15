console.log("DEBUG: index.ts exécuté");
function banner(title: string): string {
  const line = "=".repeat(title.length + 4);
  return `${line}\n| ${title} |\n${line}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR");
}



function main(): void {
  const title = "Manoir de la Chevallerie";
  const today = new Date();

  console.log(banner(title));
  console.log(`Date : ${formatDate(today)}`);
  console.log("Outil TypeScript initialisé avec succès.");
}

main();
