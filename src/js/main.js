/* This is a demo of how you can import another JS file */
import { printImportWorks } from "./other-file";
/* You can even import other resources this way */
import image from '../assets/images/image.jpg';

console.log('main js file works');
console.log('here is the path for a asset in js', image);
printImportWorks();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
		console.log('Service worker registration succeeded:', registration);
	}, /*catch*/ function (error) {
		console.log('Service worker registration failed:', error);
	});
} else {
	console.log('Service workers are not supported.');
}