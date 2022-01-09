export async function printImportWorks() {
    await new Promise((resolve => setTimeout(() => {
        console.log('imported file works')
        resolve()
    }, 2000)));
}
