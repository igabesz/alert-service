import * as merge from 'lodash.merge';
import swal from 'sweetalert2';
import { SweetAlertOptions, SweetAlertType, SweetAlertInputType } from 'sweetalert2';
export { SweetAlertOptions } from 'sweetalert2';


export class AlertService {
	static Texts = {
		successTitle: 'Success',
		warningTitle: 'Warning',
		errorTitle: 'Error',
	};

	/** Raw swal object to create advanced popups */
	get swal() { return swal; }

	/** Helper to process the various types of inputs */
	private processParams(
		options: SweetAlertOptions,
		p1: string | SweetAlertOptions,
		p2: string | SweetAlertOptions,
		p3?: SweetAlertOptions
	): {} {
		if (p1 && typeof p1 === 'string') {
			if (p2 && typeof p2 === 'string') {
				options.title = p1;
				options.text = p2;
				p3 && (options = merge(options, p3));

			}
			else {
				options.text = p1;
				p2 && (options = merge(options, p2));
			}
		}
		else {
			p1 && (options = merge(options, p1));
		}
		return options;
	}

	async successPopup(options: SweetAlertOptions): Promise<void>;
	async successPopup(text: string, options?: SweetAlertOptions): Promise<void>;
	async successPopup(title: string, text: string, options?: SweetAlertOptions): Promise<void>;
	async successPopup(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<void> {
		await new Promise<void>((resolve) => {
			let options = this.processParams({
				title: AlertService.Texts.successTitle,
				type: 'success',
			}, p1, p2, p3);
			swal(options)
			.then(resolve)
			.catch(resolve);
		});
	}

	async warningConfirm(options: SweetAlertOptions): Promise<boolean>;
	async warningConfirm(text: string, options?: SweetAlertOptions): Promise<boolean>;
	async warningConfirm(title: string, text: string, options?: SweetAlertOptions): Promise<boolean>;
	async warningConfirm(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			let options = this.processParams({
				title: AlertService.Texts.warningTitle,
				type: 'warning' ,
				showCancelButton: true,
				reverseButtons: true,
			}, p1, p2, p3);
			swal(options)
			.then(resolve)
			.catch(err => resolve(false));
		});
	}

	async errorPopup(options: SweetAlertOptions): Promise<void>;
	async errorPopup(text: string, options?: SweetAlertOptions): Promise<void>;
	async errorPopup(title: string, text: string, options?: SweetAlertOptions): Promise<void>;
	async errorPopup(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<void> {
		await new Promise<void>((resolve) => {
			let options = this.processParams({
				title: AlertService.Texts.errorTitle,
				type: 'error',
			}, p1, p2, p3);
			swal(options)
			.then(resolve)
			.catch(resolve);
		});
	}

	/** Text prompt wrapper */
	async prompt(options: SweetAlertOptions): Promise<string | false>;
	async prompt(text: string, options?: SweetAlertOptions): Promise<string | false>;
	async prompt(title: string, text: string, options?: SweetAlertOptions): Promise<string | false>;
	async prompt(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<string | false> {
		return new Promise<string | false>((resolve, reject) => {
			let options = this.processParams({
				input: 'text',
				reverseButtons: true,
				showCancelButton: true,
			}, p1, p2, p3);
			swal(options)
			.then((res: string) => resolve(res))
			.catch(() => resolve(false));
		});
	}

	/** Multiline text prompt wrapper */
	async promptMultiline(options: SweetAlertOptions): Promise<string | false>;
	async promptMultiline(text: string, options?: SweetAlertOptions): Promise<string | false>;
	async promptMultiline(title: string, text: string, options?: SweetAlertOptions): Promise<string | false>;
	async promptMultiline(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<string | false> {
		return new Promise<string | false>((resolve, reject) => {
			let options = this.processParams({
				input: 'textarea',
				reverseButtons: true,
				showCancelButton: true,
			}, p1, p2, p3);
			swal(options)
			.then((res: string) => resolve(res))
			.catch(() => resolve(false));
		});
	}

	/** Number prompt wrapper */
	async numberPrompt(options: SweetAlertOptions): Promise<number | false>;
	async numberPrompt(text: string, options?: SweetAlertOptions): Promise<number | false>;
	async numberPrompt(title: string, text: string, options?: SweetAlertOptions): Promise<number | false>;
	async numberPrompt(p1: string | SweetAlertOptions, p2?: string | SweetAlertOptions, p3?: SweetAlertOptions): Promise<number | false> {
		try {
			let options = this.processParams({
				input: 'number',
				reverseButtons: true,
				showCancelButton: true,
			}, p1, p2, p3);
			let result = await swal(options);
			let resultNum = parseFloat(result);
			if (isNaN(resultNum)) return false;
			return resultNum;
		}
		catch (err) {
			return false;
		}
	}

}


/** Add this to your Angular2 module providers. It implements the `ClassProvider` interface */
export const AlertServiceProviderNg2 = {
	provide: AlertService,
	useClass: AlertService,
};
