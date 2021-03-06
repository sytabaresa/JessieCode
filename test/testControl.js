/*
    Copyright 2011-2012
        Michael Gerhaeuser,
        Alfred Wassermann,

*/

/*
 *  Js-Test-Driver Test Suite for Generic JavaScript language tests
 *  http://code.google.com/p/js-test-driver
 */

TestCase("Control", {
    jc: null,

    setUp: function () {
        this.jc = new JXG.JessieCode();
    },

    tearDown: function () {
        this.jc = null;
    },

    testIf: function () {
        expectAsserts(3);

        try {
            this.jc.parse(
                'a = 0;'+
                'b = 0;'+
                'c = 0;'+

                'if (true) {'+
                '    a = 1;'+
                '} else {'+
                '    a = 2;'+
                '}'+

                'if (false) {'+
                '    b = 1;'+
                '} else {'+
                '    b = 2;'+
                '}'+

                'if (false) {'+
                '    c = 1;'+
                '} else if (true) {'+
                '    c = 2;'+
                '} else {'+
                '    c = 3;'+
                '}');
        } catch (e) {
            console.log(e);
        }

        assertEquals('if', 1, this.jc.scope.locals.a);
        assertEquals('else', 2, this.jc.scope.locals.b);
        assertEquals('else if', 2, this.jc.scope.locals.c);
    },

    testDanglingElse: function () {
        expectAsserts(1);

        try {
            this.jc.parse(
                'e = 1;'+

                'if (true) '+
                '  if (false) '+
                '    e = 0;'+
                '  else' +
                '    e = 2;'+

                '');
        } catch (e) {
            console.log(e);
        }

        assertEquals('dangling else', 2, this.jc.scope.locals.e);
    },

    testFor: function () {
        expectAsserts(1);

        try {
            this.jc.parse(
                'j = 0;'+
                'for (i = 0; i < 10; i = i+1) {'+
                '    j = j + 1;'+
                '}');
        } catch (e) {
            console.log(e);
        }

        assertEquals('for', 10, this.jc.scope.locals.j);
    },

    testWhile: function () {
        expectAsserts(1);

        try {
            this.jc.parse(
                'i = 0;'+
                'while (i < 10) {'+
                '    i = i + 1;'+
                '}');
        } catch (e) {
            console.log(e);
        }

        assertEquals('while', 10, this.jc.scope.locals.i);
    }
});
