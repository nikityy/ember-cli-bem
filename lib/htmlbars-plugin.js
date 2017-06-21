function getPair(node, path) {
  return findBy(node.hash.pairs, 'key', path);
}

function findBy(target, key, path) {
  for (var i = 0, l = target.length; i < l; i++) {
    if (target[i][key] === path) {
      return target[i];
    }
  }

  return false;
}

module.exports = class BEMHtmlbarsPlugin {

  constuctor() {
    this.builders = null;
    this.syntax = null;
  }

  transform(ast) {
    if (!this.builders) {
      this.builders = this.syntax.builders;
    }

    this.syntax.traverse(ast, {
      MustacheStatement: this.transformStatement.bind(this),
      BlockStatement: this.transformStatement.bind(this),
      SubExpression: this.transformSubexpression.bind(this)
    });

    return ast;
  }

  transformStatement(node) {
    if (node.path.original === 'elem') {
      this.transformLocalClassHelperInvocation(node);
    }
  }

  transformSubexpression(node) {
    if (node.path.original === 'elem') {
      this.transformLocalClassHelperInvocation(node);
    }
  }

  /**
   * Implicitly adds blockName and __namingStrategy__ to {{elem}} helper,
   * so {{elem 'foo'}} will be transformed into
   * {{elem 'foo' blockName=(unbound blockName) __namingStrategy__=(unbound __namingStrategy__)}}
   */
  transformLocalClassHelperInvocation(node) {
    if (!getPair(node, 'blockName')) {
      node.hash.pairs.push(this.builders.pair('blockName', this.unbound('blockName')));
    }

    if (!getPair(node, '__namingStrategy__')) {
      node.hash.pairs.push(this.builders.pair('__namingStrategy__', this.unbound('__namingStrategy__')));
    }
  }

  unbound(path) {
    const blockPath = this.builders.path(path);
    const unboundPath = this.builders.path('unbound');
    return this.builders.sexpr(unboundPath, [blockPath]);
  }

}
