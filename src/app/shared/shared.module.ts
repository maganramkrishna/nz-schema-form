import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxMdModule } from 'ngx-md';
import { MarkdownModule } from 'ngx-markdown';
import { AceEditorModule } from 'ng2-ace-editor';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { NzSchemaFormModule } from 'nz-schema-form';

const THIRDMODULES = [
    NgZorroAntdModule,
    NgxMdModule,
    MarkdownModule,
    AceEditorModule,
    UEditorModule,
    NgxTinymceModule,
    NzSchemaFormModule
];

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        // third libs
        ...THIRDMODULES
    ]
})
export class SharedModule { }
