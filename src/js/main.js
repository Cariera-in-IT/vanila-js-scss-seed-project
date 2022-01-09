import { printImportWorks } from "./other-file";
import image from '../assets/images/image.jpg';
import readme from '../../README.md';

console.log('readme', readme)
console.log('main js file works');
console.log(' here is the path for a asset in js', image)
printImportWorks()

fetch(readme)
    .then((r) => r.text())
    .then((r) => {
        document.getElementById('readme-content').innerText = r;
    })
