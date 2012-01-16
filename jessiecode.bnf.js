/*
    Copyright 2008-2011
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/



/*
    Default template driver for JS/CC generated parsers running as
    browser-based JavaScript/ECMAScript applications.
    
    WARNING:     This parser template will only run together with JSXGraph on a website.
    
    Features:
    - Parser trace messages
    - Integrated panic-mode error recovery
    
    Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
    Modified 2011 by Michael Gerhaeuser, JSXGraph
    
    This is in the public domain.
*/


JXG.extend(JXG.JessieCode.prototype, /** @lends JXG.JessieCode.prototype */ {
    /**
     * JS/CC interna
     * @type Boolean
     * @private
     */
    _dbg_withtrace: false,

    /**
     * JS/CC interna
     * @type String
     * @private
     */
    _dbg_string: '',

    /**
     * JS/CC interna
     * @param {String} text
     * @private
     */
    _dbg_print: function (text) {
        this._dbg_string += text + "\n";
    },

    /**
     * Internal lexer method.
     * @private
     */
    _lex: function (info) {
        var state = 0,
            match = -1,
            match_pos = 0,
            start = 0,
            pos = info.offset + 1;

        do {
            pos--;
            state = 0;
            match = -2;
            start = pos;

            if (info.src.length <= start) {
                return 64;
            }

            do {

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 13 || info.src.charCodeAt( pos ) == 32 ) state = 1;
		else if( info.src.charCodeAt( pos ) == 33 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 35 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 36 || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 67 ) || ( info.src.charCodeAt( pos ) >= 71 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 81 ) || info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 86 || ( info.src.charCodeAt( pos ) >= 88 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 99 ) || ( info.src.charCodeAt( pos ) >= 103 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 113 ) || info.src.charCodeAt( pos ) == 115 || info.src.charCodeAt( pos ) == 118 || ( info.src.charCodeAt( pos ) >= 120 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 37 ) state = 5;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 7;
		else if( info.src.charCodeAt( pos ) == 42 ) state = 8;
		else if( info.src.charCodeAt( pos ) == 43 ) state = 9;
		else if( info.src.charCodeAt( pos ) == 44 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 45 ) state = 11;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 12;
		else if( info.src.charCodeAt( pos ) == 47 ) state = 13;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 14;
		else if( info.src.charCodeAt( pos ) == 58 ) state = 15;
		else if( info.src.charCodeAt( pos ) == 59 ) state = 16;
		else if( info.src.charCodeAt( pos ) == 60 ) state = 17;
		else if( info.src.charCodeAt( pos ) == 61 ) state = 18;
		else if( info.src.charCodeAt( pos ) == 62 ) state = 19;
		else if( info.src.charCodeAt( pos ) == 91 ) state = 20;
		else if( info.src.charCodeAt( pos ) == 93 ) state = 21;
		else if( info.src.charCodeAt( pos ) == 94 ) state = 22;
		else if( info.src.charCodeAt( pos ) == 123 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 124 ) state = 24;
		else if( info.src.charCodeAt( pos ) == 125 ) state = 25;
		else if( info.src.charCodeAt( pos ) == 38 ) state = 47;
		else if( info.src.charCodeAt( pos ) == 68 || info.src.charCodeAt( pos ) == 100 ) state = 48;
		else if( info.src.charCodeAt( pos ) == 39 ) state = 50;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 51;
		else if( info.src.charCodeAt( pos ) == 70 || info.src.charCodeAt( pos ) == 102 ) state = 62;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 63;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 71;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 72;
		else if( info.src.charCodeAt( pos ) == 87 || info.src.charCodeAt( pos ) == 119 ) state = 78;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 82;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		if( info.src.charCodeAt( pos ) == 61 ) state = 26;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 39;
		match_pos = pos;
		break;

	case 4:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 5:
		state = -1;
		match = 33;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 36;
		match_pos = pos;
		break;

	case 7:
		state = -1;
		match = 37;
		match_pos = pos;
		break;

	case 8:
		state = -1;
		match = 34;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 30;
		match_pos = pos;
		break;

	case 10:
		state = -1;
		match = 38;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 31;
		match_pos = pos;
		break;

	case 12:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 29;
		else state = -1;
		match = 42;
		match_pos = pos;
		break;

	case 13:
		state = -1;
		match = 32;
		match_pos = pos;
		break;

	case 14:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 14;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 29;
		else state = -1;
		match = 45;
		match_pos = pos;
		break;

	case 15:
		state = -1;
		match = 40;
		match_pos = pos;
		break;

	case 16:
		state = -1;
		match = 19;
		match_pos = pos;
		break;

	case 17:
		if( info.src.charCodeAt( pos ) == 60 ) state = 30;
		else if( info.src.charCodeAt( pos ) == 61 ) state = 31;
		else state = -1;
		match = 26;
		match_pos = pos;
		break;

	case 18:
		if( info.src.charCodeAt( pos ) == 61 ) state = 32;
		else state = -1;
		match = 20;
		match_pos = pos;
		break;

	case 19:
		if( info.src.charCodeAt( pos ) == 61 ) state = 33;
		else if( info.src.charCodeAt( pos ) == 62 ) state = 34;
		else state = -1;
		match = 25;
		match_pos = pos;
		break;

	case 20:
		state = -1;
		match = 15;
		match_pos = pos;
		break;

	case 21:
		state = -1;
		match = 16;
		match_pos = pos;
		break;

	case 22:
		state = -1;
		match = 35;
		match_pos = pos;
		break;

	case 23:
		state = -1;
		match = 17;
		match_pos = pos;
		break;

	case 24:
		if( info.src.charCodeAt( pos ) == 124 ) state = 37;
		else state = -1;
		match = 41;
		match_pos = pos;
		break;

	case 25:
		state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 26:
		state = -1;
		match = 22;
		match_pos = pos;
		break;

	case 27:
		state = -1;
		match = 28;
		match_pos = pos;
		break;

	case 28:
		state = -1;
		match = 44;
		match_pos = pos;
		break;

	case 29:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 29;
		else state = -1;
		match = 46;
		match_pos = pos;
		break;

	case 30:
		state = -1;
		match = 13;
		match_pos = pos;
		break;

	case 31:
		state = -1;
		match = 23;
		match_pos = pos;
		break;

	case 32:
		state = -1;
		match = 21;
		match_pos = pos;
		break;

	case 33:
		state = -1;
		match = 24;
		match_pos = pos;
		break;

	case 34:
		state = -1;
		match = 14;
		match_pos = pos;
		break;

	case 35:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 36:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 37:
		state = -1;
		match = 27;
		match_pos = pos;
		break;

	case 38:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 39:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 40:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 41:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 42:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 12;
		match_pos = pos;
		break;

	case 43:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 44:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 45:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 46:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 47:
		if( info.src.charCodeAt( pos ) == 38 ) state = 27;
		else state = -1;
		break;

	case 48:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 35;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 79;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 49:
		if( info.src.charCodeAt( pos ) == 39 ) state = 28;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 40 && info.src.charCodeAt( pos ) <= 91 ) || ( info.src.charCodeAt( pos ) >= 93 && info.src.charCodeAt( pos ) <= 254 ) ) state = 50;
		else if( info.src.charCodeAt( pos ) == 92 ) state = 52;
		else state = -1;
		match = 44;
		match_pos = pos;
		break;

	case 50:
		if( info.src.charCodeAt( pos ) == 39 ) state = 28;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 40 && info.src.charCodeAt( pos ) <= 91 ) || ( info.src.charCodeAt( pos ) >= 93 && info.src.charCodeAt( pos ) <= 254 ) ) state = 50;
		else if( info.src.charCodeAt( pos ) == 92 ) state = 52;
		else state = -1;
		break;

	case 51:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 69 ) || ( info.src.charCodeAt( pos ) >= 71 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 101 ) || ( info.src.charCodeAt( pos ) >= 103 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 70 || info.src.charCodeAt( pos ) == 102 ) state = 36;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 52:
		if( info.src.charCodeAt( pos ) == 39 ) state = 49;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 40 && info.src.charCodeAt( pos ) <= 91 ) || ( info.src.charCodeAt( pos ) >= 93 && info.src.charCodeAt( pos ) <= 254 ) ) state = 50;
		else if( info.src.charCodeAt( pos ) == 92 ) state = 52;
		else state = -1;
		break;

	case 53:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 38;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 54:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 39;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 55:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 40;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 56:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 41;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 57:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 42;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 58:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 43;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 59:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 44;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 60:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 45;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 61:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 46;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 62:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 53;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 73;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 84;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 63:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 82 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 114 ) || ( info.src.charCodeAt( pos ) >= 116 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 115 ) state = 54;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 64:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 82 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 114 ) || ( info.src.charCodeAt( pos ) >= 116 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 115 ) state = 55;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 65:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 56;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 66:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 82 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 114 ) || ( info.src.charCodeAt( pos ) >= 116 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 115 ) state = 57;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 67:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 58;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 68:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 59;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 69:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 60;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 70:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 61;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 71:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 64;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 72:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 65;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 73:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 66;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 74:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 67;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 75:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 68;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 76:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 69;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 77:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 70;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 78:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 71 ) || ( info.src.charCodeAt( pos ) >= 73 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 103 ) || ( info.src.charCodeAt( pos ) >= 105 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 72 || info.src.charCodeAt( pos ) == 104 ) state = 74;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 79:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 75;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 80:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 76;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 81:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 77;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 82:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 80;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 83:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 66 ) || ( info.src.charCodeAt( pos ) >= 68 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 98 ) || ( info.src.charCodeAt( pos ) >= 100 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 67 || info.src.charCodeAt( pos ) == 99 ) state = 81;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

	case 84:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 4;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 83;
		else state = -1;
		match = 43;
		match_pos = pos;
		break;

}


                pos++;

            } while( state > -1 );

        } while (1 > -1 && match == 1);

        if (match > -1) {
            info.att = info.src.substr( start, match_pos - start );
            info.offset = match_pos;
        
switch( match )
{
	case 44:
		{
		 info.att = info.att.substr( 1, info.att.length - 2 );
                                                                                info.att = info.att.replace( /\\\'/g, "\'" );    
		}
		break;

}


        } else {
            info.att = new String();
            match = -1;
        }

        return match;
    },

    /**
     * Internal parse tree generator.
     * @param {String} src source code
     * @param {Array} err_off The positions where the errors occured are stored here.
     * @param {Array} err_la What the parser expected will be stored here.
     * @private
     */
    _parse: function (src, err_off, err_la) {
        var sstack = [],
            vstack = [],
            err_cnt = 0,
            act,
            go,
            la,
            rval,
            i,
            parseinfo = new Function( "", "var offset; var src; var att;" ),
            info = new parseinfo();

/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* Program' */, 1 ),
	new Array( 47/* Program */, 2 ),
	new Array( 47/* Program */, 0 ),
	new Array( 49/* Stmt_List */, 2 ),
	new Array( 49/* Stmt_List */, 0 ),
	new Array( 50/* Param_List */, 3 ),
	new Array( 50/* Param_List */, 1 ),
	new Array( 50/* Param_List */, 0 ),
	new Array( 52/* Prop_List */, 3 ),
	new Array( 52/* Prop_List */, 1 ),
	new Array( 52/* Prop_List */, 0 ),
	new Array( 53/* Prop */, 3 ),
	new Array( 54/* Param_Def_List */, 3 ),
	new Array( 54/* Param_Def_List */, 1 ),
	new Array( 54/* Param_Def_List */, 0 ),
	new Array( 56/* Assign */, 3 ),
	new Array( 48/* Stmt */, 3 ),
	new Array( 48/* Stmt */, 5 ),
	new Array( 48/* Stmt */, 3 ),
	new Array( 48/* Stmt */, 5 ),
	new Array( 48/* Stmt */, 9 ),
	new Array( 48/* Stmt */, 3 ),
	new Array( 48/* Stmt */, 2 ),
	new Array( 48/* Stmt */, 2 ),
	new Array( 48/* Stmt */, 2 ),
	new Array( 48/* Stmt */, 2 ),
	new Array( 48/* Stmt */, 3 ),
	new Array( 48/* Stmt */, 1 ),
	new Array( 55/* Lhs */, 3 ),
	new Array( 55/* Lhs */, 4 ),
	new Array( 55/* Lhs */, 1 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 3 ),
	new Array( 51/* Expression */, 1 ),
	new Array( 59/* LogExp */, 3 ),
	new Array( 59/* LogExp */, 3 ),
	new Array( 59/* LogExp */, 2 ),
	new Array( 59/* LogExp */, 1 ),
	new Array( 58/* AddSubExp */, 3 ),
	new Array( 58/* AddSubExp */, 3 ),
	new Array( 58/* AddSubExp */, 1 ),
	new Array( 60/* MulDivExp */, 3 ),
	new Array( 60/* MulDivExp */, 3 ),
	new Array( 60/* MulDivExp */, 3 ),
	new Array( 60/* MulDivExp */, 1 ),
	new Array( 61/* ExpExp */, 3 ),
	new Array( 61/* ExpExp */, 1 ),
	new Array( 62/* NegExp */, 2 ),
	new Array( 62/* NegExp */, 1 ),
	new Array( 57/* ExtValue */, 4 ),
	new Array( 57/* ExtValue */, 4 ),
	new Array( 57/* ExtValue */, 7 ),
	new Array( 57/* ExtValue */, 3 ),
	new Array( 57/* ExtValue */, 1 ),
	new Array( 63/* Value */, 1 ),
	new Array( 63/* Value */, 1 ),
	new Array( 63/* Value */, 1 ),
	new Array( 63/* Value */, 3 ),
	new Array( 63/* Value */, 1 ),
	new Array( 63/* Value */, 7 ),
	new Array( 63/* Value */, 3 ),
	new Array( 63/* Value */, 3 ),
	new Array( 63/* Value */, 1 ),
	new Array( 63/* Value */, 1 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 64/* "$$" */,-2 , 2/* "IF" */,-2 , 4/* "WHILE" */,-2 , 5/* "DO" */,-2 , 6/* "FOR" */,-2 , 8/* "USE" */,-2 , 10/* "DELETE" */,-2 , 9/* "RETURN" */,-2 , 17/* "{" */,-2 , 19/* ";" */,-2 , 43/* "Identifier" */,-2 , 29/* "!" */,-2 , 45/* "Integer" */,-2 , 46/* "Float" */,-2 , 36/* "(" */,-2 , 44/* "String" */,-2 , 7/* "FUNCTION" */,-2 , 13/* "<<" */,-2 , 15/* "[" */,-2 , 11/* "TRUE" */,-2 , 12/* "FALSE" */,-2 , 31/* "-" */,-2 ),
	/* State 1 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 , 64/* "$$" */,0 ),
	/* State 2 */ new Array( 64/* "$$" */,-1 , 2/* "IF" */,-1 , 4/* "WHILE" */,-1 , 5/* "DO" */,-1 , 6/* "FOR" */,-1 , 8/* "USE" */,-1 , 10/* "DELETE" */,-1 , 9/* "RETURN" */,-1 , 17/* "{" */,-1 , 19/* ";" */,-1 , 43/* "Identifier" */,-1 , 29/* "!" */,-1 , 45/* "Integer" */,-1 , 46/* "Float" */,-1 , 36/* "(" */,-1 , 44/* "String" */,-1 , 7/* "FUNCTION" */,-1 , 13/* "<<" */,-1 , 15/* "[" */,-1 , 11/* "TRUE" */,-1 , 12/* "FALSE" */,-1 , 31/* "-" */,-1 ),
	/* State 3 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 4 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 5 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 6 */ new Array( 36/* "(" */,39 ),
	/* State 7 */ new Array( 43/* "Identifier" */,40 ),
	/* State 8 */ new Array( 43/* "Identifier" */,41 ),
	/* State 9 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 10 */ new Array( 19/* ";" */,43 ),
	/* State 11 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 19/* ";" */,50 ),
	/* State 12 */ new Array( 18/* "}" */,-4 , 2/* "IF" */,-4 , 4/* "WHILE" */,-4 , 5/* "DO" */,-4 , 6/* "FOR" */,-4 , 8/* "USE" */,-4 , 10/* "DELETE" */,-4 , 9/* "RETURN" */,-4 , 17/* "{" */,-4 , 19/* ";" */,-4 , 43/* "Identifier" */,-4 , 29/* "!" */,-4 , 45/* "Integer" */,-4 , 46/* "Float" */,-4 , 36/* "(" */,-4 , 44/* "String" */,-4 , 7/* "FUNCTION" */,-4 , 13/* "<<" */,-4 , 15/* "[" */,-4 , 11/* "TRUE" */,-4 , 12/* "FALSE" */,-4 , 31/* "-" */,-4 ),
	/* State 13 */ new Array( 64/* "$$" */,-27 , 2/* "IF" */,-27 , 4/* "WHILE" */,-27 , 5/* "DO" */,-27 , 6/* "FOR" */,-27 , 8/* "USE" */,-27 , 10/* "DELETE" */,-27 , 9/* "RETURN" */,-27 , 17/* "{" */,-27 , 19/* ";" */,-27 , 43/* "Identifier" */,-27 , 29/* "!" */,-27 , 45/* "Integer" */,-27 , 46/* "Float" */,-27 , 36/* "(" */,-27 , 44/* "String" */,-27 , 7/* "FUNCTION" */,-27 , 13/* "<<" */,-27 , 15/* "[" */,-27 , 11/* "TRUE" */,-27 , 12/* "FALSE" */,-27 , 31/* "-" */,-27 , 3/* "ELSE" */,-27 , 18/* "}" */,-27 ),
	/* State 14 */ new Array( 20/* "=" */,52 ),
	/* State 15 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-37 , 21/* "==" */,-37 , 26/* "<" */,-37 , 25/* ">" */,-37 , 23/* "<=" */,-37 , 24/* ">=" */,-37 , 22/* "!=" */,-37 , 2/* "IF" */,-37 , 4/* "WHILE" */,-37 , 5/* "DO" */,-37 , 6/* "FOR" */,-37 , 8/* "USE" */,-37 , 10/* "DELETE" */,-37 , 9/* "RETURN" */,-37 , 17/* "{" */,-37 , 43/* "Identifier" */,-37 , 29/* "!" */,-37 , 45/* "Integer" */,-37 , 46/* "Float" */,-37 , 36/* "(" */,-37 , 44/* "String" */,-37 , 7/* "FUNCTION" */,-37 , 13/* "<<" */,-37 , 15/* "[" */,-37 , 11/* "TRUE" */,-37 , 12/* "FALSE" */,-37 , 31/* "-" */,-37 , 37/* ")" */,-37 , 16/* "]" */,-37 , 38/* "," */,-37 , 14/* ">>" */,-37 ),
	/* State 16 */ new Array( 42/* "." */,55 , 36/* "(" */,56 , 15/* "[" */,57 , 35/* "^" */,-52 , 19/* ";" */,-52 , 21/* "==" */,-52 , 26/* "<" */,-52 , 25/* ">" */,-52 , 23/* "<=" */,-52 , 24/* ">=" */,-52 , 22/* "!=" */,-52 , 27/* "||" */,-52 , 28/* "&&" */,-52 , 31/* "-" */,-52 , 30/* "+" */,-52 , 34/* "*" */,-52 , 32/* "/" */,-52 , 33/* "%" */,-52 ),
	/* State 17 */ new Array( 20/* "=" */,-30 , 42/* "." */,-60 , 15/* "[" */,-60 , 36/* "(" */,-60 , 35/* "^" */,-60 , 19/* ";" */,-60 , 21/* "==" */,-60 , 26/* "<" */,-60 , 25/* ">" */,-60 , 23/* "<=" */,-60 , 24/* ">=" */,-60 , 22/* "!=" */,-60 , 27/* "||" */,-60 , 28/* "&&" */,-60 , 31/* "-" */,-60 , 30/* "+" */,-60 , 34/* "*" */,-60 , 32/* "/" */,-60 , 33/* "%" */,-60 ),
	/* State 18 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 19 */ new Array( 30/* "+" */,59 , 31/* "-" */,60 , 19/* ";" */,-41 , 21/* "==" */,-41 , 26/* "<" */,-41 , 25/* ">" */,-41 , 23/* "<=" */,-41 , 24/* ">=" */,-41 , 22/* "!=" */,-41 , 27/* "||" */,-41 , 28/* "&&" */,-41 , 2/* "IF" */,-41 , 4/* "WHILE" */,-41 , 5/* "DO" */,-41 , 6/* "FOR" */,-41 , 8/* "USE" */,-41 , 10/* "DELETE" */,-41 , 9/* "RETURN" */,-41 , 17/* "{" */,-41 , 43/* "Identifier" */,-41 , 29/* "!" */,-41 , 45/* "Integer" */,-41 , 46/* "Float" */,-41 , 36/* "(" */,-41 , 44/* "String" */,-41 , 7/* "FUNCTION" */,-41 , 13/* "<<" */,-41 , 15/* "[" */,-41 , 11/* "TRUE" */,-41 , 12/* "FALSE" */,-41 , 37/* ")" */,-41 , 16/* "]" */,-41 , 38/* "," */,-41 , 14/* ">>" */,-41 ),
	/* State 20 */ new Array( 42/* "." */,-57 , 15/* "[" */,-57 , 36/* "(" */,-57 , 35/* "^" */,-57 , 19/* ";" */,-57 , 21/* "==" */,-57 , 26/* "<" */,-57 , 25/* ">" */,-57 , 23/* "<=" */,-57 , 24/* ">=" */,-57 , 22/* "!=" */,-57 , 27/* "||" */,-57 , 28/* "&&" */,-57 , 31/* "-" */,-57 , 30/* "+" */,-57 , 34/* "*" */,-57 , 32/* "/" */,-57 , 33/* "%" */,-57 , 2/* "IF" */,-57 , 4/* "WHILE" */,-57 , 5/* "DO" */,-57 , 6/* "FOR" */,-57 , 8/* "USE" */,-57 , 10/* "DELETE" */,-57 , 9/* "RETURN" */,-57 , 17/* "{" */,-57 , 43/* "Identifier" */,-57 , 29/* "!" */,-57 , 45/* "Integer" */,-57 , 46/* "Float" */,-57 , 44/* "String" */,-57 , 7/* "FUNCTION" */,-57 , 13/* "<<" */,-57 , 11/* "TRUE" */,-57 , 12/* "FALSE" */,-57 , 37/* ")" */,-57 , 16/* "]" */,-57 , 38/* "," */,-57 , 14/* ">>" */,-57 ),
	/* State 21 */ new Array( 33/* "%" */,61 , 32/* "/" */,62 , 34/* "*" */,63 , 19/* ";" */,-44 , 21/* "==" */,-44 , 26/* "<" */,-44 , 25/* ">" */,-44 , 23/* "<=" */,-44 , 24/* ">=" */,-44 , 22/* "!=" */,-44 , 27/* "||" */,-44 , 28/* "&&" */,-44 , 31/* "-" */,-44 , 30/* "+" */,-44 , 2/* "IF" */,-44 , 4/* "WHILE" */,-44 , 5/* "DO" */,-44 , 6/* "FOR" */,-44 , 8/* "USE" */,-44 , 10/* "DELETE" */,-44 , 9/* "RETURN" */,-44 , 17/* "{" */,-44 , 43/* "Identifier" */,-44 , 29/* "!" */,-44 , 45/* "Integer" */,-44 , 46/* "Float" */,-44 , 36/* "(" */,-44 , 44/* "String" */,-44 , 7/* "FUNCTION" */,-44 , 13/* "<<" */,-44 , 15/* "[" */,-44 , 11/* "TRUE" */,-44 , 12/* "FALSE" */,-44 , 37/* ")" */,-44 , 16/* "]" */,-44 , 38/* "," */,-44 , 14/* ">>" */,-44 ),
	/* State 22 */ new Array( 42/* "." */,-58 , 15/* "[" */,-58 , 36/* "(" */,-58 , 35/* "^" */,-58 , 19/* ";" */,-58 , 21/* "==" */,-58 , 26/* "<" */,-58 , 25/* ">" */,-58 , 23/* "<=" */,-58 , 24/* ">=" */,-58 , 22/* "!=" */,-58 , 27/* "||" */,-58 , 28/* "&&" */,-58 , 31/* "-" */,-58 , 30/* "+" */,-58 , 34/* "*" */,-58 , 32/* "/" */,-58 , 33/* "%" */,-58 , 2/* "IF" */,-58 , 4/* "WHILE" */,-58 , 5/* "DO" */,-58 , 6/* "FOR" */,-58 , 8/* "USE" */,-58 , 10/* "DELETE" */,-58 , 9/* "RETURN" */,-58 , 17/* "{" */,-58 , 43/* "Identifier" */,-58 , 29/* "!" */,-58 , 45/* "Integer" */,-58 , 46/* "Float" */,-58 , 44/* "String" */,-58 , 7/* "FUNCTION" */,-58 , 13/* "<<" */,-58 , 11/* "TRUE" */,-58 , 12/* "FALSE" */,-58 , 37/* ")" */,-58 , 16/* "]" */,-58 , 38/* "," */,-58 , 14/* ">>" */,-58 ),
	/* State 23 */ new Array( 42/* "." */,-59 , 15/* "[" */,-59 , 36/* "(" */,-59 , 35/* "^" */,-59 , 19/* ";" */,-59 , 21/* "==" */,-59 , 26/* "<" */,-59 , 25/* ">" */,-59 , 23/* "<=" */,-59 , 24/* ">=" */,-59 , 22/* "!=" */,-59 , 27/* "||" */,-59 , 28/* "&&" */,-59 , 31/* "-" */,-59 , 30/* "+" */,-59 , 34/* "*" */,-59 , 32/* "/" */,-59 , 33/* "%" */,-59 , 2/* "IF" */,-59 , 4/* "WHILE" */,-59 , 5/* "DO" */,-59 , 6/* "FOR" */,-59 , 8/* "USE" */,-59 , 10/* "DELETE" */,-59 , 9/* "RETURN" */,-59 , 17/* "{" */,-59 , 43/* "Identifier" */,-59 , 29/* "!" */,-59 , 45/* "Integer" */,-59 , 46/* "Float" */,-59 , 44/* "String" */,-59 , 7/* "FUNCTION" */,-59 , 13/* "<<" */,-59 , 11/* "TRUE" */,-59 , 12/* "FALSE" */,-59 , 37/* ")" */,-59 , 16/* "]" */,-59 , 38/* "," */,-59 , 14/* ">>" */,-59 ),
	/* State 24 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 25 */ new Array( 42/* "." */,-62 , 15/* "[" */,-62 , 36/* "(" */,-62 , 35/* "^" */,-62 , 19/* ";" */,-62 , 21/* "==" */,-62 , 26/* "<" */,-62 , 25/* ">" */,-62 , 23/* "<=" */,-62 , 24/* ">=" */,-62 , 22/* "!=" */,-62 , 27/* "||" */,-62 , 28/* "&&" */,-62 , 31/* "-" */,-62 , 30/* "+" */,-62 , 34/* "*" */,-62 , 32/* "/" */,-62 , 33/* "%" */,-62 , 2/* "IF" */,-62 , 4/* "WHILE" */,-62 , 5/* "DO" */,-62 , 6/* "FOR" */,-62 , 8/* "USE" */,-62 , 10/* "DELETE" */,-62 , 9/* "RETURN" */,-62 , 17/* "{" */,-62 , 43/* "Identifier" */,-62 , 29/* "!" */,-62 , 45/* "Integer" */,-62 , 46/* "Float" */,-62 , 44/* "String" */,-62 , 7/* "FUNCTION" */,-62 , 13/* "<<" */,-62 , 11/* "TRUE" */,-62 , 12/* "FALSE" */,-62 , 37/* ")" */,-62 , 16/* "]" */,-62 , 38/* "," */,-62 , 14/* ">>" */,-62 ),
	/* State 26 */ new Array( 36/* "(" */,65 ),
	/* State 27 */ new Array( 43/* "Identifier" */,68 , 14/* ">>" */,-10 , 38/* "," */,-10 ),
	/* State 28 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 16/* "]" */,-7 , 38/* "," */,-7 ),
	/* State 29 */ new Array( 42/* "." */,-66 , 15/* "[" */,-66 , 36/* "(" */,-66 , 35/* "^" */,-66 , 19/* ";" */,-66 , 21/* "==" */,-66 , 26/* "<" */,-66 , 25/* ">" */,-66 , 23/* "<=" */,-66 , 24/* ">=" */,-66 , 22/* "!=" */,-66 , 27/* "||" */,-66 , 28/* "&&" */,-66 , 31/* "-" */,-66 , 30/* "+" */,-66 , 34/* "*" */,-66 , 32/* "/" */,-66 , 33/* "%" */,-66 , 2/* "IF" */,-66 , 4/* "WHILE" */,-66 , 5/* "DO" */,-66 , 6/* "FOR" */,-66 , 8/* "USE" */,-66 , 10/* "DELETE" */,-66 , 9/* "RETURN" */,-66 , 17/* "{" */,-66 , 43/* "Identifier" */,-66 , 29/* "!" */,-66 , 45/* "Integer" */,-66 , 46/* "Float" */,-66 , 44/* "String" */,-66 , 7/* "FUNCTION" */,-66 , 13/* "<<" */,-66 , 11/* "TRUE" */,-66 , 12/* "FALSE" */,-66 , 37/* ")" */,-66 , 16/* "]" */,-66 , 38/* "," */,-66 , 14/* ">>" */,-66 ),
	/* State 30 */ new Array( 42/* "." */,-67 , 15/* "[" */,-67 , 36/* "(" */,-67 , 35/* "^" */,-67 , 19/* ";" */,-67 , 21/* "==" */,-67 , 26/* "<" */,-67 , 25/* ">" */,-67 , 23/* "<=" */,-67 , 24/* ">=" */,-67 , 22/* "!=" */,-67 , 27/* "||" */,-67 , 28/* "&&" */,-67 , 31/* "-" */,-67 , 30/* "+" */,-67 , 34/* "*" */,-67 , 32/* "/" */,-67 , 33/* "%" */,-67 , 2/* "IF" */,-67 , 4/* "WHILE" */,-67 , 5/* "DO" */,-67 , 6/* "FOR" */,-67 , 8/* "USE" */,-67 , 10/* "DELETE" */,-67 , 9/* "RETURN" */,-67 , 17/* "{" */,-67 , 43/* "Identifier" */,-67 , 29/* "!" */,-67 , 45/* "Integer" */,-67 , 46/* "Float" */,-67 , 44/* "String" */,-67 , 7/* "FUNCTION" */,-67 , 13/* "<<" */,-67 , 11/* "TRUE" */,-67 , 12/* "FALSE" */,-67 , 37/* ")" */,-67 , 16/* "]" */,-67 , 38/* "," */,-67 , 14/* ">>" */,-67 ),
	/* State 31 */ new Array( 19/* ";" */,-48 , 21/* "==" */,-48 , 26/* "<" */,-48 , 25/* ">" */,-48 , 23/* "<=" */,-48 , 24/* ">=" */,-48 , 22/* "!=" */,-48 , 27/* "||" */,-48 , 28/* "&&" */,-48 , 31/* "-" */,-48 , 30/* "+" */,-48 , 34/* "*" */,-48 , 32/* "/" */,-48 , 33/* "%" */,-48 , 2/* "IF" */,-48 , 4/* "WHILE" */,-48 , 5/* "DO" */,-48 , 6/* "FOR" */,-48 , 8/* "USE" */,-48 , 10/* "DELETE" */,-48 , 9/* "RETURN" */,-48 , 17/* "{" */,-48 , 43/* "Identifier" */,-48 , 29/* "!" */,-48 , 45/* "Integer" */,-48 , 46/* "Float" */,-48 , 36/* "(" */,-48 , 44/* "String" */,-48 , 7/* "FUNCTION" */,-48 , 13/* "<<" */,-48 , 15/* "[" */,-48 , 11/* "TRUE" */,-48 , 12/* "FALSE" */,-48 , 37/* ")" */,-48 , 16/* "]" */,-48 , 38/* "," */,-48 , 14/* ">>" */,-48 ),
	/* State 32 */ new Array( 35/* "^" */,71 , 19/* ";" */,-50 , 21/* "==" */,-50 , 26/* "<" */,-50 , 25/* ">" */,-50 , 23/* "<=" */,-50 , 24/* ">=" */,-50 , 22/* "!=" */,-50 , 27/* "||" */,-50 , 28/* "&&" */,-50 , 31/* "-" */,-50 , 30/* "+" */,-50 , 34/* "*" */,-50 , 32/* "/" */,-50 , 33/* "%" */,-50 , 2/* "IF" */,-50 , 4/* "WHILE" */,-50 , 5/* "DO" */,-50 , 6/* "FOR" */,-50 , 8/* "USE" */,-50 , 10/* "DELETE" */,-50 , 9/* "RETURN" */,-50 , 17/* "{" */,-50 , 43/* "Identifier" */,-50 , 29/* "!" */,-50 , 45/* "Integer" */,-50 , 46/* "Float" */,-50 , 36/* "(" */,-50 , 44/* "String" */,-50 , 7/* "FUNCTION" */,-50 , 13/* "<<" */,-50 , 15/* "[" */,-50 , 11/* "TRUE" */,-50 , 12/* "FALSE" */,-50 , 37/* ")" */,-50 , 16/* "]" */,-50 , 38/* "," */,-50 , 14/* ">>" */,-50 ),
	/* State 33 */ new Array( 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 34 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 35 */ new Array( 42/* "." */,74 , 36/* "(" */,56 , 15/* "[" */,75 , 35/* "^" */,-52 , 2/* "IF" */,-52 , 4/* "WHILE" */,-52 , 5/* "DO" */,-52 , 6/* "FOR" */,-52 , 8/* "USE" */,-52 , 10/* "DELETE" */,-52 , 9/* "RETURN" */,-52 , 17/* "{" */,-52 , 19/* ";" */,-52 , 43/* "Identifier" */,-52 , 29/* "!" */,-52 , 45/* "Integer" */,-52 , 46/* "Float" */,-52 , 44/* "String" */,-52 , 7/* "FUNCTION" */,-52 , 13/* "<<" */,-52 , 11/* "TRUE" */,-52 , 12/* "FALSE" */,-52 , 31/* "-" */,-52 , 21/* "==" */,-52 , 26/* "<" */,-52 , 25/* ">" */,-52 , 23/* "<=" */,-52 , 24/* ">=" */,-52 , 22/* "!=" */,-52 , 27/* "||" */,-52 , 28/* "&&" */,-52 , 30/* "+" */,-52 , 34/* "*" */,-52 , 32/* "/" */,-52 , 33/* "%" */,-52 , 37/* ")" */,-52 , 16/* "]" */,-52 , 38/* "," */,-52 , 14/* ">>" */,-52 ),
	/* State 36 */ new Array( 35/* "^" */,-60 , 2/* "IF" */,-60 , 4/* "WHILE" */,-60 , 5/* "DO" */,-60 , 6/* "FOR" */,-60 , 8/* "USE" */,-60 , 10/* "DELETE" */,-60 , 9/* "RETURN" */,-60 , 17/* "{" */,-60 , 19/* ";" */,-60 , 43/* "Identifier" */,-60 , 29/* "!" */,-60 , 45/* "Integer" */,-60 , 46/* "Float" */,-60 , 36/* "(" */,-60 , 44/* "String" */,-60 , 7/* "FUNCTION" */,-60 , 13/* "<<" */,-60 , 15/* "[" */,-60 , 11/* "TRUE" */,-60 , 12/* "FALSE" */,-60 , 31/* "-" */,-60 , 21/* "==" */,-60 , 26/* "<" */,-60 , 25/* ">" */,-60 , 23/* "<=" */,-60 , 24/* ">=" */,-60 , 22/* "!=" */,-60 , 27/* "||" */,-60 , 28/* "&&" */,-60 , 30/* "+" */,-60 , 34/* "*" */,-60 , 32/* "/" */,-60 , 33/* "%" */,-60 , 42/* "." */,-60 , 37/* ")" */,-60 , 16/* "]" */,-60 , 38/* "," */,-60 , 14/* ">>" */,-60 ),
	/* State 37 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 38 */ new Array( 4/* "WHILE" */,77 ),
	/* State 39 */ new Array( 43/* "Identifier" */,17 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 40 */ new Array( 19/* ";" */,80 ),
	/* State 41 */ new Array( 64/* "$$" */,-22 , 2/* "IF" */,-22 , 4/* "WHILE" */,-22 , 5/* "DO" */,-22 , 6/* "FOR" */,-22 , 8/* "USE" */,-22 , 10/* "DELETE" */,-22 , 9/* "RETURN" */,-22 , 17/* "{" */,-22 , 19/* ";" */,-22 , 43/* "Identifier" */,-22 , 29/* "!" */,-22 , 45/* "Integer" */,-22 , 46/* "Float" */,-22 , 36/* "(" */,-22 , 44/* "String" */,-22 , 7/* "FUNCTION" */,-22 , 13/* "<<" */,-22 , 15/* "[" */,-22 , 11/* "TRUE" */,-22 , 12/* "FALSE" */,-22 , 31/* "-" */,-22 , 3/* "ELSE" */,-22 , 18/* "}" */,-22 ),
	/* State 42 */ new Array( 64/* "$$" */,-23 , 2/* "IF" */,-23 , 4/* "WHILE" */,-23 , 5/* "DO" */,-23 , 6/* "FOR" */,-23 , 8/* "USE" */,-23 , 10/* "DELETE" */,-23 , 9/* "RETURN" */,-23 , 17/* "{" */,-23 , 19/* ";" */,-23 , 43/* "Identifier" */,-23 , 29/* "!" */,-23 , 45/* "Integer" */,-23 , 46/* "Float" */,-23 , 36/* "(" */,-23 , 44/* "String" */,-23 , 7/* "FUNCTION" */,-23 , 13/* "<<" */,-23 , 15/* "[" */,-23 , 11/* "TRUE" */,-23 , 12/* "FALSE" */,-23 , 31/* "-" */,-23 , 3/* "ELSE" */,-23 , 18/* "}" */,-23 ),
	/* State 43 */ new Array( 64/* "$$" */,-24 , 2/* "IF" */,-24 , 4/* "WHILE" */,-24 , 5/* "DO" */,-24 , 6/* "FOR" */,-24 , 8/* "USE" */,-24 , 10/* "DELETE" */,-24 , 9/* "RETURN" */,-24 , 17/* "{" */,-24 , 19/* ";" */,-24 , 43/* "Identifier" */,-24 , 29/* "!" */,-24 , 45/* "Integer" */,-24 , 46/* "Float" */,-24 , 36/* "(" */,-24 , 44/* "String" */,-24 , 7/* "FUNCTION" */,-24 , 13/* "<<" */,-24 , 15/* "[" */,-24 , 11/* "TRUE" */,-24 , 12/* "FALSE" */,-24 , 31/* "-" */,-24 , 3/* "ELSE" */,-24 , 18/* "}" */,-24 ),
	/* State 44 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 45 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 46 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 47 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 48 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 49 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 50 */ new Array( 64/* "$$" */,-25 , 2/* "IF" */,-25 , 4/* "WHILE" */,-25 , 5/* "DO" */,-25 , 6/* "FOR" */,-25 , 8/* "USE" */,-25 , 10/* "DELETE" */,-25 , 9/* "RETURN" */,-25 , 17/* "{" */,-25 , 19/* ";" */,-25 , 43/* "Identifier" */,-25 , 29/* "!" */,-25 , 45/* "Integer" */,-25 , 46/* "Float" */,-25 , 36/* "(" */,-25 , 44/* "String" */,-25 , 7/* "FUNCTION" */,-25 , 13/* "<<" */,-25 , 15/* "[" */,-25 , 11/* "TRUE" */,-25 , 12/* "FALSE" */,-25 , 31/* "-" */,-25 , 3/* "ELSE" */,-25 , 18/* "}" */,-25 ),
	/* State 51 */ new Array( 18/* "}" */,88 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 52 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 53 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 54 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 55 */ new Array( 43/* "Identifier" */,92 ),
	/* State 56 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 37/* ")" */,-7 , 38/* "," */,-7 ),
	/* State 57 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 58 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-40 , 21/* "==" */,-40 , 26/* "<" */,-40 , 25/* ">" */,-40 , 23/* "<=" */,-40 , 24/* ">=" */,-40 , 22/* "!=" */,-40 , 2/* "IF" */,-40 , 4/* "WHILE" */,-40 , 5/* "DO" */,-40 , 6/* "FOR" */,-40 , 8/* "USE" */,-40 , 10/* "DELETE" */,-40 , 9/* "RETURN" */,-40 , 17/* "{" */,-40 , 43/* "Identifier" */,-40 , 29/* "!" */,-40 , 45/* "Integer" */,-40 , 46/* "Float" */,-40 , 36/* "(" */,-40 , 44/* "String" */,-40 , 7/* "FUNCTION" */,-40 , 13/* "<<" */,-40 , 15/* "[" */,-40 , 11/* "TRUE" */,-40 , 12/* "FALSE" */,-40 , 31/* "-" */,-40 , 37/* ")" */,-40 , 16/* "]" */,-40 , 38/* "," */,-40 , 14/* ">>" */,-40 ),
	/* State 59 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 60 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 61 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 62 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 63 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 64 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 37/* ")" */,100 ),
	/* State 65 */ new Array( 43/* "Identifier" */,102 , 37/* ")" */,-14 , 38/* "," */,-14 ),
	/* State 66 */ new Array( 38/* "," */,103 , 14/* ">>" */,104 ),
	/* State 67 */ new Array( 14/* ">>" */,-9 , 38/* "," */,-9 ),
	/* State 68 */ new Array( 40/* ":" */,105 ),
	/* State 69 */ new Array( 38/* "," */,106 , 16/* "]" */,107 ),
	/* State 70 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 16/* "]" */,-6 , 38/* "," */,-6 , 37/* ")" */,-6 ),
	/* State 71 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 72 */ new Array( 42/* "." */,74 , 36/* "(" */,56 , 15/* "[" */,75 , 35/* "^" */,-51 , 19/* ";" */,-51 , 21/* "==" */,-51 , 26/* "<" */,-51 , 25/* ">" */,-51 , 23/* "<=" */,-51 , 24/* ">=" */,-51 , 22/* "!=" */,-51 , 27/* "||" */,-51 , 28/* "&&" */,-51 , 31/* "-" */,-51 , 30/* "+" */,-51 , 34/* "*" */,-51 , 32/* "/" */,-51 , 33/* "%" */,-51 , 2/* "IF" */,-51 , 4/* "WHILE" */,-51 , 5/* "DO" */,-51 , 6/* "FOR" */,-51 , 8/* "USE" */,-51 , 10/* "DELETE" */,-51 , 9/* "RETURN" */,-51 , 17/* "{" */,-51 , 43/* "Identifier" */,-51 , 29/* "!" */,-51 , 45/* "Integer" */,-51 , 46/* "Float" */,-51 , 44/* "String" */,-51 , 7/* "FUNCTION" */,-51 , 13/* "<<" */,-51 , 11/* "TRUE" */,-51 , 12/* "FALSE" */,-51 , 37/* ")" */,-51 , 16/* "]" */,-51 , 38/* "," */,-51 , 14/* ">>" */,-51 ),
	/* State 73 */ new Array( 3/* "ELSE" */,109 , 64/* "$$" */,-16 , 2/* "IF" */,-16 , 4/* "WHILE" */,-16 , 5/* "DO" */,-16 , 6/* "FOR" */,-16 , 8/* "USE" */,-16 , 10/* "DELETE" */,-16 , 9/* "RETURN" */,-16 , 17/* "{" */,-16 , 19/* ";" */,-16 , 43/* "Identifier" */,-16 , 29/* "!" */,-16 , 45/* "Integer" */,-16 , 46/* "Float" */,-16 , 36/* "(" */,-16 , 44/* "String" */,-16 , 7/* "FUNCTION" */,-16 , 13/* "<<" */,-16 , 15/* "[" */,-16 , 11/* "TRUE" */,-16 , 12/* "FALSE" */,-16 , 31/* "-" */,-16 , 18/* "}" */,-16 ),
	/* State 74 */ new Array( 43/* "Identifier" */,110 ),
	/* State 75 */ new Array( 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 76 */ new Array( 64/* "$$" */,-18 , 2/* "IF" */,-18 , 4/* "WHILE" */,-18 , 5/* "DO" */,-18 , 6/* "FOR" */,-18 , 8/* "USE" */,-18 , 10/* "DELETE" */,-18 , 9/* "RETURN" */,-18 , 17/* "{" */,-18 , 19/* ";" */,-18 , 43/* "Identifier" */,-18 , 29/* "!" */,-18 , 45/* "Integer" */,-18 , 46/* "Float" */,-18 , 36/* "(" */,-18 , 44/* "String" */,-18 , 7/* "FUNCTION" */,-18 , 13/* "<<" */,-18 , 15/* "[" */,-18 , 11/* "TRUE" */,-18 , 12/* "FALSE" */,-18 , 31/* "-" */,-18 , 3/* "ELSE" */,-18 , 18/* "}" */,-18 ),
	/* State 77 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 78 */ new Array( 19/* ";" */,113 ),
	/* State 79 */ new Array( 42/* "." */,55 , 36/* "(" */,56 , 15/* "[" */,57 ),
	/* State 80 */ new Array( 64/* "$$" */,-21 , 2/* "IF" */,-21 , 4/* "WHILE" */,-21 , 5/* "DO" */,-21 , 6/* "FOR" */,-21 , 8/* "USE" */,-21 , 10/* "DELETE" */,-21 , 9/* "RETURN" */,-21 , 17/* "{" */,-21 , 19/* ";" */,-21 , 43/* "Identifier" */,-21 , 29/* "!" */,-21 , 45/* "Integer" */,-21 , 46/* "Float" */,-21 , 36/* "(" */,-21 , 44/* "String" */,-21 , 7/* "FUNCTION" */,-21 , 13/* "<<" */,-21 , 15/* "[" */,-21 , 11/* "TRUE" */,-21 , 12/* "FALSE" */,-21 , 31/* "-" */,-21 , 3/* "ELSE" */,-21 , 18/* "}" */,-21 ),
	/* State 81 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-36 , 21/* "==" */,-36 , 26/* "<" */,-36 , 25/* ">" */,-36 , 23/* "<=" */,-36 , 24/* ">=" */,-36 , 22/* "!=" */,-36 , 2/* "IF" */,-36 , 4/* "WHILE" */,-36 , 5/* "DO" */,-36 , 6/* "FOR" */,-36 , 8/* "USE" */,-36 , 10/* "DELETE" */,-36 , 9/* "RETURN" */,-36 , 17/* "{" */,-36 , 43/* "Identifier" */,-36 , 29/* "!" */,-36 , 45/* "Integer" */,-36 , 46/* "Float" */,-36 , 36/* "(" */,-36 , 44/* "String" */,-36 , 7/* "FUNCTION" */,-36 , 13/* "<<" */,-36 , 15/* "[" */,-36 , 11/* "TRUE" */,-36 , 12/* "FALSE" */,-36 , 31/* "-" */,-36 , 37/* ")" */,-36 , 16/* "]" */,-36 , 38/* "," */,-36 , 14/* ">>" */,-36 ),
	/* State 82 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-35 , 21/* "==" */,-35 , 26/* "<" */,-35 , 25/* ">" */,-35 , 23/* "<=" */,-35 , 24/* ">=" */,-35 , 22/* "!=" */,-35 , 2/* "IF" */,-35 , 4/* "WHILE" */,-35 , 5/* "DO" */,-35 , 6/* "FOR" */,-35 , 8/* "USE" */,-35 , 10/* "DELETE" */,-35 , 9/* "RETURN" */,-35 , 17/* "{" */,-35 , 43/* "Identifier" */,-35 , 29/* "!" */,-35 , 45/* "Integer" */,-35 , 46/* "Float" */,-35 , 36/* "(" */,-35 , 44/* "String" */,-35 , 7/* "FUNCTION" */,-35 , 13/* "<<" */,-35 , 15/* "[" */,-35 , 11/* "TRUE" */,-35 , 12/* "FALSE" */,-35 , 31/* "-" */,-35 , 37/* ")" */,-35 , 16/* "]" */,-35 , 38/* "," */,-35 , 14/* ">>" */,-35 ),
	/* State 83 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-34 , 21/* "==" */,-34 , 26/* "<" */,-34 , 25/* ">" */,-34 , 23/* "<=" */,-34 , 24/* ">=" */,-34 , 22/* "!=" */,-34 , 2/* "IF" */,-34 , 4/* "WHILE" */,-34 , 5/* "DO" */,-34 , 6/* "FOR" */,-34 , 8/* "USE" */,-34 , 10/* "DELETE" */,-34 , 9/* "RETURN" */,-34 , 17/* "{" */,-34 , 43/* "Identifier" */,-34 , 29/* "!" */,-34 , 45/* "Integer" */,-34 , 46/* "Float" */,-34 , 36/* "(" */,-34 , 44/* "String" */,-34 , 7/* "FUNCTION" */,-34 , 13/* "<<" */,-34 , 15/* "[" */,-34 , 11/* "TRUE" */,-34 , 12/* "FALSE" */,-34 , 31/* "-" */,-34 , 37/* ")" */,-34 , 16/* "]" */,-34 , 38/* "," */,-34 , 14/* ">>" */,-34 ),
	/* State 84 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-33 , 21/* "==" */,-33 , 26/* "<" */,-33 , 25/* ">" */,-33 , 23/* "<=" */,-33 , 24/* ">=" */,-33 , 22/* "!=" */,-33 , 2/* "IF" */,-33 , 4/* "WHILE" */,-33 , 5/* "DO" */,-33 , 6/* "FOR" */,-33 , 8/* "USE" */,-33 , 10/* "DELETE" */,-33 , 9/* "RETURN" */,-33 , 17/* "{" */,-33 , 43/* "Identifier" */,-33 , 29/* "!" */,-33 , 45/* "Integer" */,-33 , 46/* "Float" */,-33 , 36/* "(" */,-33 , 44/* "String" */,-33 , 7/* "FUNCTION" */,-33 , 13/* "<<" */,-33 , 15/* "[" */,-33 , 11/* "TRUE" */,-33 , 12/* "FALSE" */,-33 , 31/* "-" */,-33 , 37/* ")" */,-33 , 16/* "]" */,-33 , 38/* "," */,-33 , 14/* ">>" */,-33 ),
	/* State 85 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-32 , 21/* "==" */,-32 , 26/* "<" */,-32 , 25/* ">" */,-32 , 23/* "<=" */,-32 , 24/* ">=" */,-32 , 22/* "!=" */,-32 , 2/* "IF" */,-32 , 4/* "WHILE" */,-32 , 5/* "DO" */,-32 , 6/* "FOR" */,-32 , 8/* "USE" */,-32 , 10/* "DELETE" */,-32 , 9/* "RETURN" */,-32 , 17/* "{" */,-32 , 43/* "Identifier" */,-32 , 29/* "!" */,-32 , 45/* "Integer" */,-32 , 46/* "Float" */,-32 , 36/* "(" */,-32 , 44/* "String" */,-32 , 7/* "FUNCTION" */,-32 , 13/* "<<" */,-32 , 15/* "[" */,-32 , 11/* "TRUE" */,-32 , 12/* "FALSE" */,-32 , 31/* "-" */,-32 , 37/* ")" */,-32 , 16/* "]" */,-32 , 38/* "," */,-32 , 14/* ">>" */,-32 ),
	/* State 86 */ new Array( 28/* "&&" */,53 , 27/* "||" */,54 , 19/* ";" */,-31 , 21/* "==" */,-31 , 26/* "<" */,-31 , 25/* ">" */,-31 , 23/* "<=" */,-31 , 24/* ">=" */,-31 , 22/* "!=" */,-31 , 2/* "IF" */,-31 , 4/* "WHILE" */,-31 , 5/* "DO" */,-31 , 6/* "FOR" */,-31 , 8/* "USE" */,-31 , 10/* "DELETE" */,-31 , 9/* "RETURN" */,-31 , 17/* "{" */,-31 , 43/* "Identifier" */,-31 , 29/* "!" */,-31 , 45/* "Integer" */,-31 , 46/* "Float" */,-31 , 36/* "(" */,-31 , 44/* "String" */,-31 , 7/* "FUNCTION" */,-31 , 13/* "<<" */,-31 , 15/* "[" */,-31 , 11/* "TRUE" */,-31 , 12/* "FALSE" */,-31 , 31/* "-" */,-31 , 37/* ")" */,-31 , 16/* "]" */,-31 , 38/* "," */,-31 , 14/* ">>" */,-31 ),
	/* State 87 */ new Array( 18/* "}" */,-3 , 2/* "IF" */,-3 , 4/* "WHILE" */,-3 , 5/* "DO" */,-3 , 6/* "FOR" */,-3 , 8/* "USE" */,-3 , 10/* "DELETE" */,-3 , 9/* "RETURN" */,-3 , 17/* "{" */,-3 , 19/* ";" */,-3 , 43/* "Identifier" */,-3 , 29/* "!" */,-3 , 45/* "Integer" */,-3 , 46/* "Float" */,-3 , 36/* "(" */,-3 , 44/* "String" */,-3 , 7/* "FUNCTION" */,-3 , 13/* "<<" */,-3 , 15/* "[" */,-3 , 11/* "TRUE" */,-3 , 12/* "FALSE" */,-3 , 31/* "-" */,-3 ),
	/* State 88 */ new Array( 64/* "$$" */,-26 , 2/* "IF" */,-26 , 4/* "WHILE" */,-26 , 5/* "DO" */,-26 , 6/* "FOR" */,-26 , 8/* "USE" */,-26 , 10/* "DELETE" */,-26 , 9/* "RETURN" */,-26 , 17/* "{" */,-26 , 19/* ";" */,-26 , 43/* "Identifier" */,-26 , 29/* "!" */,-26 , 45/* "Integer" */,-26 , 46/* "Float" */,-26 , 36/* "(" */,-26 , 44/* "String" */,-26 , 7/* "FUNCTION" */,-26 , 13/* "<<" */,-26 , 15/* "[" */,-26 , 11/* "TRUE" */,-26 , 12/* "FALSE" */,-26 , 31/* "-" */,-26 , 3/* "ELSE" */,-26 , 18/* "}" */,-26 ),
	/* State 89 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 19/* ";" */,-15 , 37/* ")" */,-15 ),
	/* State 90 */ new Array( 30/* "+" */,59 , 31/* "-" */,60 , 19/* ";" */,-39 , 21/* "==" */,-39 , 26/* "<" */,-39 , 25/* ">" */,-39 , 23/* "<=" */,-39 , 24/* ">=" */,-39 , 22/* "!=" */,-39 , 27/* "||" */,-39 , 28/* "&&" */,-39 , 2/* "IF" */,-39 , 4/* "WHILE" */,-39 , 5/* "DO" */,-39 , 6/* "FOR" */,-39 , 8/* "USE" */,-39 , 10/* "DELETE" */,-39 , 9/* "RETURN" */,-39 , 17/* "{" */,-39 , 43/* "Identifier" */,-39 , 29/* "!" */,-39 , 45/* "Integer" */,-39 , 46/* "Float" */,-39 , 36/* "(" */,-39 , 44/* "String" */,-39 , 7/* "FUNCTION" */,-39 , 13/* "<<" */,-39 , 15/* "[" */,-39 , 11/* "TRUE" */,-39 , 12/* "FALSE" */,-39 , 37/* ")" */,-39 , 16/* "]" */,-39 , 38/* "," */,-39 , 14/* ">>" */,-39 ),
	/* State 91 */ new Array( 30/* "+" */,59 , 31/* "-" */,60 , 19/* ";" */,-38 , 21/* "==" */,-38 , 26/* "<" */,-38 , 25/* ">" */,-38 , 23/* "<=" */,-38 , 24/* ">=" */,-38 , 22/* "!=" */,-38 , 27/* "||" */,-38 , 28/* "&&" */,-38 , 2/* "IF" */,-38 , 4/* "WHILE" */,-38 , 5/* "DO" */,-38 , 6/* "FOR" */,-38 , 8/* "USE" */,-38 , 10/* "DELETE" */,-38 , 9/* "RETURN" */,-38 , 17/* "{" */,-38 , 43/* "Identifier" */,-38 , 29/* "!" */,-38 , 45/* "Integer" */,-38 , 46/* "Float" */,-38 , 36/* "(" */,-38 , 44/* "String" */,-38 , 7/* "FUNCTION" */,-38 , 13/* "<<" */,-38 , 15/* "[" */,-38 , 11/* "TRUE" */,-38 , 12/* "FALSE" */,-38 , 37/* ")" */,-38 , 16/* "]" */,-38 , 38/* "," */,-38 , 14/* ">>" */,-38 ),
	/* State 92 */ new Array( 20/* "=" */,-28 , 42/* "." */,-56 , 15/* "[" */,-56 , 36/* "(" */,-56 , 35/* "^" */,-56 , 19/* ";" */,-56 , 21/* "==" */,-56 , 26/* "<" */,-56 , 25/* ">" */,-56 , 23/* "<=" */,-56 , 24/* ">=" */,-56 , 22/* "!=" */,-56 , 27/* "||" */,-56 , 28/* "&&" */,-56 , 31/* "-" */,-56 , 30/* "+" */,-56 , 34/* "*" */,-56 , 32/* "/" */,-56 , 33/* "%" */,-56 ),
	/* State 93 */ new Array( 38/* "," */,106 , 37/* ")" */,114 ),
	/* State 94 */ new Array( 30/* "+" */,59 , 31/* "-" */,60 , 16/* "]" */,115 ),
	/* State 95 */ new Array( 33/* "%" */,61 , 32/* "/" */,62 , 34/* "*" */,63 , 19/* ";" */,-43 , 21/* "==" */,-43 , 26/* "<" */,-43 , 25/* ">" */,-43 , 23/* "<=" */,-43 , 24/* ">=" */,-43 , 22/* "!=" */,-43 , 27/* "||" */,-43 , 28/* "&&" */,-43 , 31/* "-" */,-43 , 30/* "+" */,-43 , 2/* "IF" */,-43 , 4/* "WHILE" */,-43 , 5/* "DO" */,-43 , 6/* "FOR" */,-43 , 8/* "USE" */,-43 , 10/* "DELETE" */,-43 , 9/* "RETURN" */,-43 , 17/* "{" */,-43 , 43/* "Identifier" */,-43 , 29/* "!" */,-43 , 45/* "Integer" */,-43 , 46/* "Float" */,-43 , 36/* "(" */,-43 , 44/* "String" */,-43 , 7/* "FUNCTION" */,-43 , 13/* "<<" */,-43 , 15/* "[" */,-43 , 11/* "TRUE" */,-43 , 12/* "FALSE" */,-43 , 37/* ")" */,-43 , 16/* "]" */,-43 , 38/* "," */,-43 , 14/* ">>" */,-43 ),
	/* State 96 */ new Array( 33/* "%" */,61 , 32/* "/" */,62 , 34/* "*" */,63 , 19/* ";" */,-42 , 21/* "==" */,-42 , 26/* "<" */,-42 , 25/* ">" */,-42 , 23/* "<=" */,-42 , 24/* ">=" */,-42 , 22/* "!=" */,-42 , 27/* "||" */,-42 , 28/* "&&" */,-42 , 31/* "-" */,-42 , 30/* "+" */,-42 , 2/* "IF" */,-42 , 4/* "WHILE" */,-42 , 5/* "DO" */,-42 , 6/* "FOR" */,-42 , 8/* "USE" */,-42 , 10/* "DELETE" */,-42 , 9/* "RETURN" */,-42 , 17/* "{" */,-42 , 43/* "Identifier" */,-42 , 29/* "!" */,-42 , 45/* "Integer" */,-42 , 46/* "Float" */,-42 , 36/* "(" */,-42 , 44/* "String" */,-42 , 7/* "FUNCTION" */,-42 , 13/* "<<" */,-42 , 15/* "[" */,-42 , 11/* "TRUE" */,-42 , 12/* "FALSE" */,-42 , 37/* ")" */,-42 , 16/* "]" */,-42 , 38/* "," */,-42 , 14/* ">>" */,-42 ),
	/* State 97 */ new Array( 19/* ";" */,-47 , 21/* "==" */,-47 , 26/* "<" */,-47 , 25/* ">" */,-47 , 23/* "<=" */,-47 , 24/* ">=" */,-47 , 22/* "!=" */,-47 , 27/* "||" */,-47 , 28/* "&&" */,-47 , 31/* "-" */,-47 , 30/* "+" */,-47 , 34/* "*" */,-47 , 32/* "/" */,-47 , 33/* "%" */,-47 , 2/* "IF" */,-47 , 4/* "WHILE" */,-47 , 5/* "DO" */,-47 , 6/* "FOR" */,-47 , 8/* "USE" */,-47 , 10/* "DELETE" */,-47 , 9/* "RETURN" */,-47 , 17/* "{" */,-47 , 43/* "Identifier" */,-47 , 29/* "!" */,-47 , 45/* "Integer" */,-47 , 46/* "Float" */,-47 , 36/* "(" */,-47 , 44/* "String" */,-47 , 7/* "FUNCTION" */,-47 , 13/* "<<" */,-47 , 15/* "[" */,-47 , 11/* "TRUE" */,-47 , 12/* "FALSE" */,-47 , 37/* ")" */,-47 , 16/* "]" */,-47 , 38/* "," */,-47 , 14/* ">>" */,-47 ),
	/* State 98 */ new Array( 19/* ";" */,-46 , 21/* "==" */,-46 , 26/* "<" */,-46 , 25/* ">" */,-46 , 23/* "<=" */,-46 , 24/* ">=" */,-46 , 22/* "!=" */,-46 , 27/* "||" */,-46 , 28/* "&&" */,-46 , 31/* "-" */,-46 , 30/* "+" */,-46 , 34/* "*" */,-46 , 32/* "/" */,-46 , 33/* "%" */,-46 , 2/* "IF" */,-46 , 4/* "WHILE" */,-46 , 5/* "DO" */,-46 , 6/* "FOR" */,-46 , 8/* "USE" */,-46 , 10/* "DELETE" */,-46 , 9/* "RETURN" */,-46 , 17/* "{" */,-46 , 43/* "Identifier" */,-46 , 29/* "!" */,-46 , 45/* "Integer" */,-46 , 46/* "Float" */,-46 , 36/* "(" */,-46 , 44/* "String" */,-46 , 7/* "FUNCTION" */,-46 , 13/* "<<" */,-46 , 15/* "[" */,-46 , 11/* "TRUE" */,-46 , 12/* "FALSE" */,-46 , 37/* ")" */,-46 , 16/* "]" */,-46 , 38/* "," */,-46 , 14/* ">>" */,-46 ),
	/* State 99 */ new Array( 19/* ";" */,-45 , 21/* "==" */,-45 , 26/* "<" */,-45 , 25/* ">" */,-45 , 23/* "<=" */,-45 , 24/* ">=" */,-45 , 22/* "!=" */,-45 , 27/* "||" */,-45 , 28/* "&&" */,-45 , 31/* "-" */,-45 , 30/* "+" */,-45 , 34/* "*" */,-45 , 32/* "/" */,-45 , 33/* "%" */,-45 , 2/* "IF" */,-45 , 4/* "WHILE" */,-45 , 5/* "DO" */,-45 , 6/* "FOR" */,-45 , 8/* "USE" */,-45 , 10/* "DELETE" */,-45 , 9/* "RETURN" */,-45 , 17/* "{" */,-45 , 43/* "Identifier" */,-45 , 29/* "!" */,-45 , 45/* "Integer" */,-45 , 46/* "Float" */,-45 , 36/* "(" */,-45 , 44/* "String" */,-45 , 7/* "FUNCTION" */,-45 , 13/* "<<" */,-45 , 15/* "[" */,-45 , 11/* "TRUE" */,-45 , 12/* "FALSE" */,-45 , 37/* ")" */,-45 , 16/* "]" */,-45 , 38/* "," */,-45 , 14/* ">>" */,-45 ),
	/* State 100 */ new Array( 42/* "." */,-61 , 15/* "[" */,-61 , 36/* "(" */,-61 , 35/* "^" */,-61 , 19/* ";" */,-61 , 21/* "==" */,-61 , 26/* "<" */,-61 , 25/* ">" */,-61 , 23/* "<=" */,-61 , 24/* ">=" */,-61 , 22/* "!=" */,-61 , 27/* "||" */,-61 , 28/* "&&" */,-61 , 31/* "-" */,-61 , 30/* "+" */,-61 , 34/* "*" */,-61 , 32/* "/" */,-61 , 33/* "%" */,-61 , 2/* "IF" */,-61 , 4/* "WHILE" */,-61 , 5/* "DO" */,-61 , 6/* "FOR" */,-61 , 8/* "USE" */,-61 , 10/* "DELETE" */,-61 , 9/* "RETURN" */,-61 , 17/* "{" */,-61 , 43/* "Identifier" */,-61 , 29/* "!" */,-61 , 45/* "Integer" */,-61 , 46/* "Float" */,-61 , 44/* "String" */,-61 , 7/* "FUNCTION" */,-61 , 13/* "<<" */,-61 , 11/* "TRUE" */,-61 , 12/* "FALSE" */,-61 , 37/* ")" */,-61 , 16/* "]" */,-61 , 38/* "," */,-61 , 14/* ">>" */,-61 ),
	/* State 101 */ new Array( 38/* "," */,116 , 37/* ")" */,117 ),
	/* State 102 */ new Array( 37/* ")" */,-13 , 38/* "," */,-13 ),
	/* State 103 */ new Array( 43/* "Identifier" */,68 ),
	/* State 104 */ new Array( 42/* "." */,-64 , 15/* "[" */,-64 , 36/* "(" */,-64 , 35/* "^" */,-64 , 19/* ";" */,-64 , 21/* "==" */,-64 , 26/* "<" */,-64 , 25/* ">" */,-64 , 23/* "<=" */,-64 , 24/* ">=" */,-64 , 22/* "!=" */,-64 , 27/* "||" */,-64 , 28/* "&&" */,-64 , 31/* "-" */,-64 , 30/* "+" */,-64 , 34/* "*" */,-64 , 32/* "/" */,-64 , 33/* "%" */,-64 , 2/* "IF" */,-64 , 4/* "WHILE" */,-64 , 5/* "DO" */,-64 , 6/* "FOR" */,-64 , 8/* "USE" */,-64 , 10/* "DELETE" */,-64 , 9/* "RETURN" */,-64 , 17/* "{" */,-64 , 43/* "Identifier" */,-64 , 29/* "!" */,-64 , 45/* "Integer" */,-64 , 46/* "Float" */,-64 , 44/* "String" */,-64 , 7/* "FUNCTION" */,-64 , 13/* "<<" */,-64 , 11/* "TRUE" */,-64 , 12/* "FALSE" */,-64 , 37/* ")" */,-64 , 16/* "]" */,-64 , 38/* "," */,-64 , 14/* ">>" */,-64 ),
	/* State 105 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 106 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 107 */ new Array( 42/* "." */,-65 , 15/* "[" */,-65 , 36/* "(" */,-65 , 35/* "^" */,-65 , 19/* ";" */,-65 , 21/* "==" */,-65 , 26/* "<" */,-65 , 25/* ">" */,-65 , 23/* "<=" */,-65 , 24/* ">=" */,-65 , 22/* "!=" */,-65 , 27/* "||" */,-65 , 28/* "&&" */,-65 , 31/* "-" */,-65 , 30/* "+" */,-65 , 34/* "*" */,-65 , 32/* "/" */,-65 , 33/* "%" */,-65 , 2/* "IF" */,-65 , 4/* "WHILE" */,-65 , 5/* "DO" */,-65 , 6/* "FOR" */,-65 , 8/* "USE" */,-65 , 10/* "DELETE" */,-65 , 9/* "RETURN" */,-65 , 17/* "{" */,-65 , 43/* "Identifier" */,-65 , 29/* "!" */,-65 , 45/* "Integer" */,-65 , 46/* "Float" */,-65 , 44/* "String" */,-65 , 7/* "FUNCTION" */,-65 , 13/* "<<" */,-65 , 11/* "TRUE" */,-65 , 12/* "FALSE" */,-65 , 37/* ")" */,-65 , 16/* "]" */,-65 , 38/* "," */,-65 , 14/* ">>" */,-65 ),
	/* State 108 */ new Array( 19/* ";" */,-49 , 21/* "==" */,-49 , 26/* "<" */,-49 , 25/* ">" */,-49 , 23/* "<=" */,-49 , 24/* ">=" */,-49 , 22/* "!=" */,-49 , 27/* "||" */,-49 , 28/* "&&" */,-49 , 31/* "-" */,-49 , 30/* "+" */,-49 , 34/* "*" */,-49 , 32/* "/" */,-49 , 33/* "%" */,-49 , 2/* "IF" */,-49 , 4/* "WHILE" */,-49 , 5/* "DO" */,-49 , 6/* "FOR" */,-49 , 8/* "USE" */,-49 , 10/* "DELETE" */,-49 , 9/* "RETURN" */,-49 , 17/* "{" */,-49 , 43/* "Identifier" */,-49 , 29/* "!" */,-49 , 45/* "Integer" */,-49 , 46/* "Float" */,-49 , 36/* "(" */,-49 , 44/* "String" */,-49 , 7/* "FUNCTION" */,-49 , 13/* "<<" */,-49 , 15/* "[" */,-49 , 11/* "TRUE" */,-49 , 12/* "FALSE" */,-49 , 37/* ")" */,-49 , 16/* "]" */,-49 , 38/* "," */,-49 , 14/* ">>" */,-49 ),
	/* State 109 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 110 */ new Array( 35/* "^" */,-56 , 2/* "IF" */,-56 , 4/* "WHILE" */,-56 , 5/* "DO" */,-56 , 6/* "FOR" */,-56 , 8/* "USE" */,-56 , 10/* "DELETE" */,-56 , 9/* "RETURN" */,-56 , 17/* "{" */,-56 , 19/* ";" */,-56 , 43/* "Identifier" */,-56 , 29/* "!" */,-56 , 45/* "Integer" */,-56 , 46/* "Float" */,-56 , 36/* "(" */,-56 , 44/* "String" */,-56 , 7/* "FUNCTION" */,-56 , 13/* "<<" */,-56 , 15/* "[" */,-56 , 11/* "TRUE" */,-56 , 12/* "FALSE" */,-56 , 31/* "-" */,-56 , 21/* "==" */,-56 , 26/* "<" */,-56 , 25/* ">" */,-56 , 23/* "<=" */,-56 , 24/* ">=" */,-56 , 22/* "!=" */,-56 , 27/* "||" */,-56 , 28/* "&&" */,-56 , 30/* "+" */,-56 , 34/* "*" */,-56 , 32/* "/" */,-56 , 33/* "%" */,-56 , 42/* "." */,-56 , 37/* ")" */,-56 , 16/* "]" */,-56 , 38/* "," */,-56 , 14/* ">>" */,-56 ),
	/* State 111 */ new Array( 30/* "+" */,59 , 31/* "-" */,60 , 16/* "]" */,122 ),
	/* State 112 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 19/* ";" */,123 ),
	/* State 113 */ new Array( 29/* "!" */,18 , 31/* "-" */,33 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 43/* "Identifier" */,36 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 114 */ new Array( 13/* "<<" */,125 , 42/* "." */,-54 , 15/* "[" */,-54 , 36/* "(" */,-54 , 35/* "^" */,-54 , 19/* ";" */,-54 , 21/* "==" */,-54 , 26/* "<" */,-54 , 25/* ">" */,-54 , 23/* "<=" */,-54 , 24/* ">=" */,-54 , 22/* "!=" */,-54 , 27/* "||" */,-54 , 28/* "&&" */,-54 , 31/* "-" */,-54 , 30/* "+" */,-54 , 34/* "*" */,-54 , 32/* "/" */,-54 , 33/* "%" */,-54 , 2/* "IF" */,-54 , 4/* "WHILE" */,-54 , 5/* "DO" */,-54 , 6/* "FOR" */,-54 , 8/* "USE" */,-54 , 10/* "DELETE" */,-54 , 9/* "RETURN" */,-54 , 17/* "{" */,-54 , 43/* "Identifier" */,-54 , 29/* "!" */,-54 , 45/* "Integer" */,-54 , 46/* "Float" */,-54 , 44/* "String" */,-54 , 7/* "FUNCTION" */,-54 , 11/* "TRUE" */,-54 , 12/* "FALSE" */,-54 , 37/* ")" */,-54 , 16/* "]" */,-54 , 38/* "," */,-54 , 14/* ">>" */,-54 ),
	/* State 115 */ new Array( 42/* "." */,-53 , 15/* "[" */,-53 , 36/* "(" */,-53 , 35/* "^" */,-53 , 19/* ";" */,-53 , 21/* "==" */,-53 , 26/* "<" */,-53 , 25/* ">" */,-53 , 23/* "<=" */,-53 , 24/* ">=" */,-53 , 22/* "!=" */,-53 , 27/* "||" */,-53 , 28/* "&&" */,-53 , 31/* "-" */,-53 , 30/* "+" */,-53 , 34/* "*" */,-53 , 32/* "/" */,-53 , 33/* "%" */,-53 , 20/* "=" */,-29 ),
	/* State 116 */ new Array( 43/* "Identifier" */,126 ),
	/* State 117 */ new Array( 17/* "{" */,127 ),
	/* State 118 */ new Array( 14/* ">>" */,-8 , 38/* "," */,-8 ),
	/* State 119 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 14/* ">>" */,-11 , 38/* "," */,-11 ),
	/* State 120 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 16/* "]" */,-5 , 38/* "," */,-5 , 37/* ")" */,-5 ),
	/* State 121 */ new Array( 64/* "$$" */,-17 , 2/* "IF" */,-17 , 4/* "WHILE" */,-17 , 5/* "DO" */,-17 , 6/* "FOR" */,-17 , 8/* "USE" */,-17 , 10/* "DELETE" */,-17 , 9/* "RETURN" */,-17 , 17/* "{" */,-17 , 19/* ";" */,-17 , 43/* "Identifier" */,-17 , 29/* "!" */,-17 , 45/* "Integer" */,-17 , 46/* "Float" */,-17 , 36/* "(" */,-17 , 44/* "String" */,-17 , 7/* "FUNCTION" */,-17 , 13/* "<<" */,-17 , 15/* "[" */,-17 , 11/* "TRUE" */,-17 , 12/* "FALSE" */,-17 , 31/* "-" */,-17 , 3/* "ELSE" */,-17 , 18/* "}" */,-17 ),
	/* State 122 */ new Array( 35/* "^" */,-53 , 2/* "IF" */,-53 , 4/* "WHILE" */,-53 , 5/* "DO" */,-53 , 6/* "FOR" */,-53 , 8/* "USE" */,-53 , 10/* "DELETE" */,-53 , 9/* "RETURN" */,-53 , 17/* "{" */,-53 , 19/* ";" */,-53 , 43/* "Identifier" */,-53 , 29/* "!" */,-53 , 45/* "Integer" */,-53 , 46/* "Float" */,-53 , 36/* "(" */,-53 , 44/* "String" */,-53 , 7/* "FUNCTION" */,-53 , 13/* "<<" */,-53 , 15/* "[" */,-53 , 11/* "TRUE" */,-53 , 12/* "FALSE" */,-53 , 31/* "-" */,-53 , 21/* "==" */,-53 , 26/* "<" */,-53 , 25/* ">" */,-53 , 23/* "<=" */,-53 , 24/* ">=" */,-53 , 22/* "!=" */,-53 , 27/* "||" */,-53 , 28/* "&&" */,-53 , 30/* "+" */,-53 , 34/* "*" */,-53 , 32/* "/" */,-53 , 33/* "%" */,-53 , 42/* "." */,-53 , 37/* ")" */,-53 , 16/* "]" */,-53 , 38/* "," */,-53 , 14/* ">>" */,-53 ),
	/* State 123 */ new Array( 64/* "$$" */,-19 , 2/* "IF" */,-19 , 4/* "WHILE" */,-19 , 5/* "DO" */,-19 , 6/* "FOR" */,-19 , 8/* "USE" */,-19 , 10/* "DELETE" */,-19 , 9/* "RETURN" */,-19 , 17/* "{" */,-19 , 19/* ";" */,-19 , 43/* "Identifier" */,-19 , 29/* "!" */,-19 , 45/* "Integer" */,-19 , 46/* "Float" */,-19 , 36/* "(" */,-19 , 44/* "String" */,-19 , 7/* "FUNCTION" */,-19 , 13/* "<<" */,-19 , 15/* "[" */,-19 , 11/* "TRUE" */,-19 , 12/* "FALSE" */,-19 , 31/* "-" */,-19 , 3/* "ELSE" */,-19 , 18/* "}" */,-19 ),
	/* State 124 */ new Array( 22/* "!=" */,44 , 24/* ">=" */,45 , 23/* "<=" */,46 , 25/* ">" */,47 , 26/* "<" */,48 , 21/* "==" */,49 , 19/* ";" */,128 ),
	/* State 125 */ new Array( 43/* "Identifier" */,68 , 14/* ">>" */,-10 , 38/* "," */,-10 ),
	/* State 126 */ new Array( 37/* ")" */,-12 , 38/* "," */,-12 ),
	/* State 127 */ new Array( 18/* "}" */,-4 , 2/* "IF" */,-4 , 4/* "WHILE" */,-4 , 5/* "DO" */,-4 , 6/* "FOR" */,-4 , 8/* "USE" */,-4 , 10/* "DELETE" */,-4 , 9/* "RETURN" */,-4 , 17/* "{" */,-4 , 19/* ";" */,-4 , 43/* "Identifier" */,-4 , 29/* "!" */,-4 , 45/* "Integer" */,-4 , 46/* "Float" */,-4 , 36/* "(" */,-4 , 44/* "String" */,-4 , 7/* "FUNCTION" */,-4 , 13/* "<<" */,-4 , 15/* "[" */,-4 , 11/* "TRUE" */,-4 , 12/* "FALSE" */,-4 , 31/* "-" */,-4 ),
	/* State 128 */ new Array( 43/* "Identifier" */,17 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 ),
	/* State 129 */ new Array( 38/* "," */,103 , 14/* ">>" */,132 ),
	/* State 130 */ new Array( 18/* "}" */,133 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 131 */ new Array( 37/* ")" */,134 ),
	/* State 132 */ new Array( 42/* "." */,-55 , 15/* "[" */,-55 , 36/* "(" */,-55 , 35/* "^" */,-55 , 19/* ";" */,-55 , 21/* "==" */,-55 , 26/* "<" */,-55 , 25/* ">" */,-55 , 23/* "<=" */,-55 , 24/* ">=" */,-55 , 22/* "!=" */,-55 , 27/* "||" */,-55 , 28/* "&&" */,-55 , 31/* "-" */,-55 , 30/* "+" */,-55 , 34/* "*" */,-55 , 32/* "/" */,-55 , 33/* "%" */,-55 , 2/* "IF" */,-55 , 4/* "WHILE" */,-55 , 5/* "DO" */,-55 , 6/* "FOR" */,-55 , 8/* "USE" */,-55 , 10/* "DELETE" */,-55 , 9/* "RETURN" */,-55 , 17/* "{" */,-55 , 43/* "Identifier" */,-55 , 29/* "!" */,-55 , 45/* "Integer" */,-55 , 46/* "Float" */,-55 , 44/* "String" */,-55 , 7/* "FUNCTION" */,-55 , 13/* "<<" */,-55 , 11/* "TRUE" */,-55 , 12/* "FALSE" */,-55 , 37/* ")" */,-55 , 16/* "]" */,-55 , 38/* "," */,-55 , 14/* ">>" */,-55 ),
	/* State 133 */ new Array( 42/* "." */,-63 , 15/* "[" */,-63 , 36/* "(" */,-63 , 35/* "^" */,-63 , 19/* ";" */,-63 , 21/* "==" */,-63 , 26/* "<" */,-63 , 25/* ">" */,-63 , 23/* "<=" */,-63 , 24/* ">=" */,-63 , 22/* "!=" */,-63 , 27/* "||" */,-63 , 28/* "&&" */,-63 , 31/* "-" */,-63 , 30/* "+" */,-63 , 34/* "*" */,-63 , 32/* "/" */,-63 , 33/* "%" */,-63 , 2/* "IF" */,-63 , 4/* "WHILE" */,-63 , 5/* "DO" */,-63 , 6/* "FOR" */,-63 , 8/* "USE" */,-63 , 10/* "DELETE" */,-63 , 9/* "RETURN" */,-63 , 17/* "{" */,-63 , 43/* "Identifier" */,-63 , 29/* "!" */,-63 , 45/* "Integer" */,-63 , 46/* "Float" */,-63 , 44/* "String" */,-63 , 7/* "FUNCTION" */,-63 , 13/* "<<" */,-63 , 11/* "TRUE" */,-63 , 12/* "FALSE" */,-63 , 37/* ")" */,-63 , 16/* "]" */,-63 , 38/* "," */,-63 , 14/* ">>" */,-63 ),
	/* State 134 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 6/* "FOR" */,6 , 8/* "USE" */,7 , 10/* "DELETE" */,8 , 9/* "RETURN" */,9 , 17/* "{" */,12 , 19/* ";" */,13 , 43/* "Identifier" */,17 , 29/* "!" */,18 , 45/* "Integer" */,22 , 46/* "Float" */,23 , 36/* "(" */,24 , 44/* "String" */,25 , 7/* "FUNCTION" */,26 , 13/* "<<" */,27 , 15/* "[" */,28 , 11/* "TRUE" */,29 , 12/* "FALSE" */,30 , 31/* "-" */,33 ),
	/* State 135 */ new Array( 64/* "$$" */,-20 , 2/* "IF" */,-20 , 4/* "WHILE" */,-20 , 5/* "DO" */,-20 , 6/* "FOR" */,-20 , 8/* "USE" */,-20 , 10/* "DELETE" */,-20 , 9/* "RETURN" */,-20 , 17/* "{" */,-20 , 19/* ";" */,-20 , 43/* "Identifier" */,-20 , 29/* "!" */,-20 , 45/* "Integer" */,-20 , 46/* "Float" */,-20 , 36/* "(" */,-20 , 44/* "String" */,-20 , 7/* "FUNCTION" */,-20 , 13/* "<<" */,-20 , 15/* "[" */,-20 , 11/* "TRUE" */,-20 , 12/* "FALSE" */,-20 , 31/* "-" */,-20 , 3/* "ELSE" */,-20 , 18/* "}" */,-20 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 47/* Program */,1 ),
	/* State 1 */ new Array( 48/* Stmt */,2 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array( 51/* Expression */,34 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 4 */ new Array( 51/* Expression */,37 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 5 */ new Array( 48/* Stmt */,38 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 6 */ new Array(  ),
	/* State 7 */ new Array(  ),
	/* State 8 */ new Array(  ),
	/* State 9 */ new Array( 48/* Stmt */,42 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array(  ),
	/* State 12 */ new Array( 49/* Stmt_List */,51 ),
	/* State 13 */ new Array(  ),
	/* State 14 */ new Array(  ),
	/* State 15 */ new Array(  ),
	/* State 16 */ new Array(  ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array( 59/* LogExp */,58 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  ),
	/* State 22 */ new Array(  ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array( 51/* Expression */,64 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 25 */ new Array(  ),
	/* State 26 */ new Array(  ),
	/* State 27 */ new Array( 52/* Prop_List */,66 , 53/* Prop */,67 ),
	/* State 28 */ new Array( 50/* Param_List */,69 , 51/* Expression */,70 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 29 */ new Array(  ),
	/* State 30 */ new Array(  ),
	/* State 31 */ new Array(  ),
	/* State 32 */ new Array(  ),
	/* State 33 */ new Array( 57/* ExtValue */,72 , 63/* Value */,20 ),
	/* State 34 */ new Array( 48/* Stmt */,73 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 35 */ new Array(  ),
	/* State 36 */ new Array(  ),
	/* State 37 */ new Array( 48/* Stmt */,76 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 38 */ new Array(  ),
	/* State 39 */ new Array( 56/* Assign */,78 , 55/* Lhs */,14 , 57/* ExtValue */,79 , 63/* Value */,20 ),
	/* State 40 */ new Array(  ),
	/* State 41 */ new Array(  ),
	/* State 42 */ new Array(  ),
	/* State 43 */ new Array(  ),
	/* State 44 */ new Array( 59/* LogExp */,81 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 45 */ new Array( 59/* LogExp */,82 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 46 */ new Array( 59/* LogExp */,83 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 47 */ new Array( 59/* LogExp */,84 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 48 */ new Array( 59/* LogExp */,85 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 49 */ new Array( 59/* LogExp */,86 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 50 */ new Array(  ),
	/* State 51 */ new Array( 48/* Stmt */,87 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 52 */ new Array( 51/* Expression */,89 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 53 */ new Array( 58/* AddSubExp */,90 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 54 */ new Array( 58/* AddSubExp */,91 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 55 */ new Array(  ),
	/* State 56 */ new Array( 50/* Param_List */,93 , 51/* Expression */,70 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 57 */ new Array( 58/* AddSubExp */,94 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 58 */ new Array(  ),
	/* State 59 */ new Array( 60/* MulDivExp */,95 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 60 */ new Array( 60/* MulDivExp */,96 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 61 */ new Array( 61/* ExpExp */,97 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 62 */ new Array( 61/* ExpExp */,98 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 63 */ new Array( 61/* ExpExp */,99 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 64 */ new Array(  ),
	/* State 65 */ new Array( 54/* Param_Def_List */,101 ),
	/* State 66 */ new Array(  ),
	/* State 67 */ new Array(  ),
	/* State 68 */ new Array(  ),
	/* State 69 */ new Array(  ),
	/* State 70 */ new Array(  ),
	/* State 71 */ new Array( 61/* ExpExp */,108 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 72 */ new Array(  ),
	/* State 73 */ new Array(  ),
	/* State 74 */ new Array(  ),
	/* State 75 */ new Array( 58/* AddSubExp */,111 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 76 */ new Array(  ),
	/* State 77 */ new Array( 51/* Expression */,112 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 78 */ new Array(  ),
	/* State 79 */ new Array(  ),
	/* State 80 */ new Array(  ),
	/* State 81 */ new Array(  ),
	/* State 82 */ new Array(  ),
	/* State 83 */ new Array(  ),
	/* State 84 */ new Array(  ),
	/* State 85 */ new Array(  ),
	/* State 86 */ new Array(  ),
	/* State 87 */ new Array(  ),
	/* State 88 */ new Array(  ),
	/* State 89 */ new Array(  ),
	/* State 90 */ new Array(  ),
	/* State 91 */ new Array(  ),
	/* State 92 */ new Array(  ),
	/* State 93 */ new Array(  ),
	/* State 94 */ new Array(  ),
	/* State 95 */ new Array(  ),
	/* State 96 */ new Array(  ),
	/* State 97 */ new Array(  ),
	/* State 98 */ new Array(  ),
	/* State 99 */ new Array(  ),
	/* State 100 */ new Array(  ),
	/* State 101 */ new Array(  ),
	/* State 102 */ new Array(  ),
	/* State 103 */ new Array( 53/* Prop */,118 ),
	/* State 104 */ new Array(  ),
	/* State 105 */ new Array( 51/* Expression */,119 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 106 */ new Array( 51/* Expression */,120 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 107 */ new Array(  ),
	/* State 108 */ new Array(  ),
	/* State 109 */ new Array( 48/* Stmt */,121 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 110 */ new Array(  ),
	/* State 111 */ new Array(  ),
	/* State 112 */ new Array(  ),
	/* State 113 */ new Array( 51/* Expression */,124 , 59/* LogExp */,15 , 58/* AddSubExp */,19 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 , 57/* ExtValue */,35 , 63/* Value */,20 ),
	/* State 114 */ new Array(  ),
	/* State 115 */ new Array(  ),
	/* State 116 */ new Array(  ),
	/* State 117 */ new Array(  ),
	/* State 118 */ new Array(  ),
	/* State 119 */ new Array(  ),
	/* State 120 */ new Array(  ),
	/* State 121 */ new Array(  ),
	/* State 122 */ new Array(  ),
	/* State 123 */ new Array(  ),
	/* State 124 */ new Array(  ),
	/* State 125 */ new Array( 52/* Prop_List */,129 , 53/* Prop */,67 ),
	/* State 126 */ new Array(  ),
	/* State 127 */ new Array( 49/* Stmt_List */,130 ),
	/* State 128 */ new Array( 56/* Assign */,131 , 55/* Lhs */,14 , 57/* ExtValue */,79 , 63/* Value */,20 ),
	/* State 129 */ new Array(  ),
	/* State 130 */ new Array( 48/* Stmt */,87 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 131 */ new Array(  ),
	/* State 132 */ new Array(  ),
	/* State 133 */ new Array(  ),
	/* State 134 */ new Array( 48/* Stmt */,135 , 56/* Assign */,10 , 51/* Expression */,11 , 55/* Lhs */,14 , 59/* LogExp */,15 , 57/* ExtValue */,16 , 58/* AddSubExp */,19 , 63/* Value */,20 , 60/* MulDivExp */,21 , 61/* ExpExp */,31 , 62/* NegExp */,32 ),
	/* State 135 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"Program'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"IF" /* Terminal symbol */,
	"ELSE" /* Terminal symbol */,
	"WHILE" /* Terminal symbol */,
	"DO" /* Terminal symbol */,
	"FOR" /* Terminal symbol */,
	"FUNCTION" /* Terminal symbol */,
	"USE" /* Terminal symbol */,
	"RETURN" /* Terminal symbol */,
	"DELETE" /* Terminal symbol */,
	"TRUE" /* Terminal symbol */,
	"FALSE" /* Terminal symbol */,
	"<<" /* Terminal symbol */,
	">>" /* Terminal symbol */,
	"[" /* Terminal symbol */,
	"]" /* Terminal symbol */,
	"{" /* Terminal symbol */,
	"}" /* Terminal symbol */,
	";" /* Terminal symbol */,
	"=" /* Terminal symbol */,
	"==" /* Terminal symbol */,
	"!=" /* Terminal symbol */,
	"<=" /* Terminal symbol */,
	">=" /* Terminal symbol */,
	">" /* Terminal symbol */,
	"<" /* Terminal symbol */,
	"||" /* Terminal symbol */,
	"&&" /* Terminal symbol */,
	"!" /* Terminal symbol */,
	"+" /* Terminal symbol */,
	"-" /* Terminal symbol */,
	"/" /* Terminal symbol */,
	"%" /* Terminal symbol */,
	"*" /* Terminal symbol */,
	"^" /* Terminal symbol */,
	"(" /* Terminal symbol */,
	")" /* Terminal symbol */,
	"," /* Terminal symbol */,
	"#" /* Terminal symbol */,
	":" /* Terminal symbol */,
	"|" /* Terminal symbol */,
	"." /* Terminal symbol */,
	"Identifier" /* Terminal symbol */,
	"String" /* Terminal symbol */,
	"Integer" /* Terminal symbol */,
	"Float" /* Terminal symbol */,
	"Program" /* Non-terminal symbol */,
	"Stmt" /* Non-terminal symbol */,
	"Stmt_List" /* Non-terminal symbol */,
	"Param_List" /* Non-terminal symbol */,
	"Expression" /* Non-terminal symbol */,
	"Prop_List" /* Non-terminal symbol */,
	"Prop" /* Non-terminal symbol */,
	"Param_Def_List" /* Non-terminal symbol */,
	"Lhs" /* Non-terminal symbol */,
	"Assign" /* Non-terminal symbol */,
	"ExtValue" /* Non-terminal symbol */,
	"AddSubExp" /* Non-terminal symbol */,
	"LogExp" /* Non-terminal symbol */,
	"MulDivExp" /* Non-terminal symbol */,
	"ExpExp" /* Non-terminal symbol */,
	"NegExp" /* Non-terminal symbol */,
	"Value" /* Non-terminal symbol */,
	"$$" /* Terminal symbol */
);


    
        info.offset = 0;
        info.src = src;
        info.att = '';
    
        if( !err_off ) {
            err_off = [];
        }
        if( !err_la ) {
            err_la = [];
        }
    
        sstack.push(0);
        vstack.push(0);
    
        la = this._lex(info);

        while (true) {
            act = 137;
            for (i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2) {
                if (act_tab[sstack[sstack.length-1]][i] == la) {
                    act = act_tab[sstack[sstack.length-1]][i+1];
                    break;
                }
            }

            if (this._dbg_withtrace && sstack.length > 0) {
                this._dbg_print("\nState " + sstack[sstack.length-1] + "\n" +
                                "\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
                                "\tAction: " + act + "\n" +
                                "\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
                                        "..." : "" ) + "\"\n" +
                                "\tStack: " + sstack.join() + "\n" +
                                "\tValue stack: " + vstack.join() + "\n");
            }
        
            //Panic-mode: Try recovery when parse-error occurs!
            if (act == 137) {
                if (this._dbg_withtrace)
                    this._dbg_print("Error detected: There is no reduce or shift on the symbol " + labels[la]);
            
                err_cnt++;
                err_off.push(info.offset - info.att.length);
                err_la.push([]);
                for (i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2) {
                    err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
                }
            
                //Remember the original stack!
                var rsstack = [];
                var rvstack = [];
                for (i = 0; i < sstack.length; i++) {
                    rsstack[i] = sstack[i];
                    rvstack[i] = vstack[i];
                }

                while (act == 137 && la != 64) {
                    if (this._dbg_withtrace) {
                        this._dbg_print("\tError recovery\n" +
                                        "Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
                                        "Action: " + act + "\n\n");
                    }
                    if (la == -1) {
                        info.offset++;
                    }

                    while (act == 137 && sstack.length > 0) {
                        sstack.pop();
                        vstack.pop();

                        if (sstack.length == 0) {
                            break;
                        }

                        act = 137;
                        for (i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2) {
                            if (act_tab[sstack[sstack.length-1]][i] == la) {
                                act = act_tab[sstack[sstack.length-1]][i+1];
                                break;
                            }
                        }
                    }

                    if (act != 137) {
                        break;
                    }

                    for (i = 0; i < rsstack.length; i++) {
                        sstack.push(rsstack[i]);
                        vstack.push(rvstack[i]);
                    }

                    la = this._lex(info);
                }

                if (act == 137) {
                    if (this._dbg_withtrace ) {
                        this._dbg_print("\tError recovery failed, terminating parse process...");
                    }
                    break;
                }

                if (this._dbg_withtrace) {
                    this._dbg_print("\tError recovery succeeded, continuing");
                }
            }

            //Shift
            if (act > 0) {
                if (this._dbg_withtrace) {
                    this._dbg_print("Shifting symbol: " + labels[la] + " (" + info.att + ")");
                }

                sstack.push(act);
                vstack.push(info.att);

                la = this._lex(info);

                if (this._dbg_withtrace) {
                    this._dbg_print("\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")");
                }
            }
            //Reduce
            else {
                act *= -1;

                if (this._dbg_withtrace) {
                    this._dbg_print("Reducing by producution: " + act);
                }

                rval = void(0);

                if (this._dbg_withtrace) {
                    this._dbg_print("\tPerforming semantic action...");
                }

switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		 this.execute( vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 2:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 3:
	{
		 rval = this.createNode('node_op', 'op_none', vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 4:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 5:
	{
		 rval = this.createNode('node_op', 'op_param', vstack[ vstack.length - 1 ], vstack[ vstack.length - 3 ] ); 
	}
	break;
	case 6:
	{
		 rval = this.createNode('node_op', 'op_param', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 7:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 8:
	{
		 rval = this.createNode('node_op', 'op_proplst', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 9:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 10:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 11:
	{
		 rval = this.createNode('node_op', 'op_prop', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 12:
	{
		 rval = this.createNode('node_op', 'op_paramdef', vstack[ vstack.length - 1 ], vstack[ vstack.length - 3 ]); 
	}
	break;
	case 13:
	{
		 rval = this.createNode('node_op', 'op_paramdef', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 14:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 15:
	{
		 rval = this.createNode('node_op', 'op_assign', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 16:
	{
		 rval = this.createNode('node_op', 'op_if', vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 17:
	{
		 rval = this.createNode('node_op', 'op_if_else', vstack[ vstack.length - 4 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 18:
	{
		 rval = this.createNode('node_op', 'op_while', vstack[ vstack.length - 2 ], vstack[ vstack.length - 0 ] ); 
	}
	break;
	case 19:
	{
		 rval = this.createNode('node_op', 'op_do', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 20:
	{
		 rval = this.createNode('node_op', 'op_for', vstack[ vstack.length - 7 ], vstack[ vstack.length - 5 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 21:
	{
		 rval = this.createNode('node_op', 'op_use', vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 22:
	{
		 rval = this.createNode('node_op', 'op_delete', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 23:
	{
		 rval = this.createNode('node_op', 'op_return', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 24:
	{
		rval = vstack[ vstack.length - 2 ];
	}
	break;
	case 25:
	{
		 rval = this.createNode('node_op', 'op_noassign', vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 26:
	{
		 rval = vstack[ vstack.length - 2 ]; rval.needsBrackets = true; 
	}
	break;
	case 27:
	{
		 rval = this.createNode('node_op', 'op_none' ); 
	}
	break;
	case 28:
	{
		 rval = this.createNode('node_op', 'op_lhs', vstack[ vstack.length - 1 ], vstack[ vstack.length - 3 ], 'dot'); 
	}
	break;
	case 29:
	{
		 rval = this.createNode('node_op', 'op_lhs', vstack[ vstack.length - 2 ], vstack[ vstack.length - 4 ], 'bracket'); 
	}
	break;
	case 30:
	{
		 rval = this.createNode('node_op', 'op_lhs', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 31:
	{
		 rval = this.createNode('node_op', 'op_equ', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 32:
	{
		 rval = this.createNode('node_op', 'op_lot', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 33:
	{
		 rval = this.createNode('node_op', 'op_grt', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 34:
	{
		 rval = this.createNode('node_op', 'op_loe', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 35:
	{
		 rval = this.createNode('node_op', 'op_gre', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 36:
	{
		 rval = this.createNode('node_op', 'op_neq', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 37:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 38:
	{
		 rval = this.createNode('node_op', 'op_or', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 39:
	{
		 rval = this.createNode('node_op', 'op_and', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 40:
	{
		 rval = this.createNode('node_op', 'op_not', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 41:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 42:
	{
		 rval = this.createNode('node_op', 'op_sub', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 43:
	{
		 rval = this.createNode('node_op', 'op_add', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 44:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 45:
	{
		 rval = this.createNode('node_op', 'op_mul', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 46:
	{
		 rval = this.createNode('node_op', 'op_div', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 47:
	{
		 rval = this.createNode('node_op', 'op_mod', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 48:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 49:
	{
		 rval = this.createNode('node_op', 'op_exp', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 50:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 51:
	{
		 rval = this.createNode('node_op', 'op_neg', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 52:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 53:
	{
		 rval = this.createNode('node_op', 'op_extvalue', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 54:
	{
		 rval = this.createNode('node_op', 'op_execfun', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 55:
	{
		 rval = this.createNode('node_op', 'op_execfun', vstack[ vstack.length - 7 ], vstack[ vstack.length - 5 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 56:
	{
		 rval = this.createNode('node_op', 'op_property', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 57:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 58:
	{
		 rval = this.createNode('node_const', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 59:
	{
		 rval = this.createNode('node_const', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 60:
	{
		 rval = this.createNode('node_var', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 61:
	{
		 rval = vstack[ vstack.length - 2 ]; 
	}
	break;
	case 62:
	{
		 rval = this.createNode('node_str', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 63:
	{
		 rval = this.createNode('node_op', 'op_function', vstack[ vstack.length - 5 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 64:
	{
		 rval = this.createNode('node_op', 'op_proplst_val', vstack[ vstack.length - 2 ]); 
	}
	break;
	case 65:
	{
		 rval = this.createNode('node_op', 'op_array', vstack[ vstack.length - 2 ]); 
	}
	break;
	case 66:
	{
		 rval = this.createNode('node_const_bool', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 67:
	{
		 rval = this.createNode('node_const_bool', vstack[ vstack.length - 1 ] ); 
	}
	break;
}



                if (this._dbg_withtrace) {
                    this._dbg_print("\tPopping " + pop_tab[act][1] + " off the stack...");
                }

                for (i = 0; i < pop_tab[act][1]; i++) {
                    sstack.pop();
                    vstack.pop();
                }

                go = -1;
                for (i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2) {
                    if (goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0]) {
                        go = goto_tab[sstack[sstack.length-1]][i+1];
                        break;
                    }
                }

                if (act == 0) {
                    break;
                }

                if (this._dbg_withtrace) {
                    this._dbg_print("\tPushing non-terminal " + labels[pop_tab[act][0]]);
                }

                sstack.push(go);
                vstack.push(rval);
            }

            if (this._dbg_withtrace ) {
                alert(this._dbg_string);
                this._dbg_string = '';
            }
        }

        if (this._dbg_withtrace) {
            this._dbg_print("\nParse complete.");
            alert(this._dbg_string);
        }

        return err_cnt;
    }
});


