export async function printImportWorks() {
    await new Promise((resolve => setTimeout(() => {
        console.log('This imported file works!')
        resolve()
    }, 2000)));
}
