import { Injectable } from '@angular/core';

import * as ts from "typescript";
import { FormatCodeOptions, TextChange, ScriptTarget } from 'typescript';



@Injectable()
export class FormatService {
  constructor() {

  }

  format(input: string, options: FormatCodeOptions) : string {
    var rulesProvider = new (<any>ts).formatting.RulesProvider();
    rulesProvider.ensureUpToDate(options);

    var sourceFile = ts.createSourceFile("input", input, ScriptTarget.Latest);
    var edits : TextChange[] = (<any>ts).formatting.formatDocument(sourceFile, rulesProvider, options);

    return this.applyEdits(input, edits);
  }

  applyEdits(text: string, edits: TextChange[]): string {
    // Apply edits in reverse on the existing text
    let result = text;
    for (let i = edits.length - 1; i >= 0; i--) {
      let change = edits[i];
      let head: string;
      if (typeof change.span.start === "number") {
        head = result.slice(0, change.span.start);
      } else {
        // backward compat for typescript-1.4.1
        head = result.slice(0, (<any>change.span.start)());
      }
      let tail: string;
      if (typeof change.span.start === "number") {
        tail = result.slice(change.span.start + change.span.length);
      } else {
        // backward compat for typescript-1.4.1
        tail = result.slice((<any>change.span.start)() + (<any>change.span.length)());
      }
      result = head + change.newText + tail;
    }
    return result;
  }
}
