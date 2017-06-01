# Alert Service

This is a wrapper lib for SweetAlert2 with optional Angular2 support.
It makes most of the boilerplate while makes available to


## Install

`npm i alert-service -S`

If using it in Angular2 you can import the `AlertServiceProviderNg2` and add it to the list of providers in your module.


## Usage

### Available functions

- `successPopup`: success + ok button
- `warningConfirm`: warning + ok / cancel
- `errorPopup`: error + ok button
- `prompt`: text prompt
- `promptMultiline`: multiline prompt
- `numberPrompt`: number prompt

You can use the `swal` getter to get the original SweetAlert function.


### Parameters

Call signature for all functions:

- `successPopup(options: SweetAlertOptions): Promise<void>`
- `successPopup(text: string): Promise<void>`
- `successPopup(text: string, options: SweetAlertOptions): Promise<void>`
- `successPopup(title: string, text: string): Promise<void>`
- `successPopup(title: string, text: string, options: SweetAlertOptions): Promise<void>`


### Return values

All functions are async, e.g. they are then-able or awaitable.
**Important**: The functions won't throw exceptions (so you shouldn't use `.catch()`), they return `false` when the original SweetAlert throws an exception.

Return types:

- The alert-type popups (success, error) return `Promise<void>`
- The confirm popup (warning) returns `Promise<boolean>`, `true` on confirmation
- The prompts (text, multiline, number) return `Promise<string | false>` or `Proise<number | false>`, `false` on any ways of cancel.
