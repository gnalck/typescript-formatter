import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormatService } from './format.service';
import { FormatCodeOptions, IndentStyle } from 'typescript';

@Component({
  selector: 'formatter',
  templateUrl: 'app/format.component.html',
  providers: [FormatService]
})
export class FormatComponent implements OnInit {
  options: FormatCodeOptions;

  constructor(private formatService: FormatService) { }

  format(code: string) {
    return this.formatService.format(code, this.options);
  }

  ngOnInit() {
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
