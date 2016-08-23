import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FORM_DIRECTIVES} from '@angular/common';

import { FormatService } from './format.service';
import { FormatCodeOptions, IndentStyle } from 'typescript';

@Component({
  selector: 'formatter',
  templateUrl: 'app/format.component.html',
  providers: [FormatService],
  directives: [FORM_DIRECTIVES]
})
export class FormatComponent implements OnInit {
  options: FormatCodeOptions;
  code: string;

  constructor(private formatService: FormatService) { }

  format() {
    this.code = this.formatService.format(this.code, this.options);
  }

  ngOnInit() {
    this.code = "var a  = 5;"
    this.options =  {
        IndentSize: 4,
        TabSize: 4,
        IndentStyle: IndentStyle.Smart,
        NewLineCharacter: '\n',
        ConvertTabsToSpaces: true,
        InsertSpaceAfterCommaDelimiter: true,
        InsertSpaceAfterSemicolonInForStatements: true,
        InsertSpaceBeforeAndAfterBinaryOperators: true,
        InsertSpaceAfterKeywordsInControlFlowStatements: true,
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        PlaceOpenBraceOnNewLineForFunctions: false,
        PlaceOpenBraceOnNewLineForControlBlocks: false,
    }
  }
}
