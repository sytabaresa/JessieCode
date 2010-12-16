// Control structures and functions

var

//Structs

/**
 * Create a new parse tree node.
 * @param {String} type Type of node, e.g. node_op, node_var, or node_const
 * @param value The nodes value, e.g. a variables value or a functions body.
 * @param {Array} children Arbitrary number of child nodes.
 */
node = function(type, value, children) {
    return {
        type: type,
        value: value,
        children: children
    };
},

// Management functions

/**
 * Create a new parse tree node. Basically the same as node(), but this builds
 * the children part out of an arbitrary number of parameters, instead of one
 * array parameter.
 * @param {String} type Type of node, e.g. node_op, node_var, or node_const
 * @param value The nodes value, e.g. a variables value or a functions body.
 * @param children Arbitrary number of parameters; define the child nodes.
 */
createNode = function(type, value, children) {
    var n = node(type, value, []),
        i;
    
    for(i = 2; i < arguments.length; i++)
        n.children.push( arguments[i] );
        
    return n;
},

// Parsed variables
variables = {},
stack = [],

// board currently in use
board,

_debug = function(log) {
    if(typeof console !== "undefined") {
        console.log(log);
    } else if(document.getElementById('debug') !== null) {
        document.getElementById('debug').innerHTML += log + '<br />';
    }
},

_error = function(msg) {
    throw new Error(msg);
},

//Interpreting function
letvar = function(vname, value) {
    variables[vname] = value;
},

getvar = function(vname) {
    return variables[vname] || 0;
},

execute = function( node ) {
    var ret = 0;
    
    if( !node )
        return 0;

    switch( node.type )
    {
        case 'node_op':
            switch( node.value )
            {
                case 'op_none':
                    if( node.children[0] )
                        execute( node.children[0] );                    
                    if( node.children[1] )
                        ret = execute( node.children[1] );
                    break;
                case 'op_assign':
                    letvar( node.children[0], execute( node.children[1] ) );
                    break;
                case 'op_noassign':
                    execute(node.children[0]);
                    break;
                case 'op_if':
                    if( execute( node.children[0] ) )
                        execute( node.children[1] );
                    break;
                case 'op_if_else':
                    if( execute( node.children[0] ) )
                        execute( node.children[1] );
                    else
                        execute( node.children[2] );
                    break;
                case 'op_while':
                    while( execute( node.children[0] ) )
                        execute( node.children[1] );
                    break;
                case 'op_for':
                    // todo
                    do
                        execute( node.children[0] )
                    while( execute( node.children[1] ) );
                    break;
                case 'op_paramlst':
                    if(node.children[0]) {
                        execute(node.children[0]);
                    }
                    if(node.children[1]) {
                        ret = execute(node.children[1]);
                        stack.push(ret);
                    }
                    break;
                case 'op_param':
                    if( node.children[0] ) {
                        ret = execute(node.children[0]);
                        stack.push(ret);
                    }
                    break;
                case 'op_paramdeflst':
                    if(node.children[0]) {
                        execute(node.children[0]);
                    }
                    if(node.children[1]) {
                        ret = node.children[1];
                        stack.push(ret);
                    }
                    break;
                case 'op_paramdef':
                    if( node.children[0] ) {
                        ret = node.children[0];
                        stack.push(ret);
                    }
                    break;
                case 'op_function':
                    execute(node.children[0]);
                    _debug(stack);
// TODO: PARAMETER HANDLING!
                    ret = function() {
                        execute(node.children[1]);
                    }
                    stack = [];
                    break;
                case 'op_create':
                    execute(node.children[0]);
                    ret = board.create(stack[0], stack.slice(1));
                    stack = [];
                    break;
                case 'op_use':
                    var found = false;
                    for(var b in JXG.JSXGraph.boards) {
                        if(JXG.JSXGraph.boards[b].container === node.children[0].toString()) {
                            board = JXG.JSXGraph.boards[b];
                            found = true;

                            _debug('now using board ' + board.id);
                        }
                    }
                    
                    if(!found)
                        alert(node.children[0].toString() + ' not found!');
                    break;
                case 'op_equ':
                    ret = execute( node.children[0] ) == execute( node.children[1] );
                    break;
                case 'op_neq':
                    ret = execute( node.children[0] ) != execute( node.children[1] );
                    break;
                case 'op_grt':
                    ret = execute( node.children[0] ) > execute( node.children[1] );
                    break;
                case 'op_lot':
                    ret = execute( node.children[0] ) < execute( node.children[1] );
                    break;
                case 'op_gre':
                    ret = execute( node.children[0] ) >= execute( node.children[1] );
                    break;
                case 'op_loe':
                    ret = execute( node.children[0] ) <= execute( node.children[1] );
                    break;
                case 'op_add':
                    ret = execute( node.children[0] ) + execute( node.children[1] );
                    break;
                case 'op_sub':
                    ret = execute( node.children[0] ) - execute( node.children[1] );
                    break;
                case 'op_div':
                    ret = execute( node.children[0] ) / execute( node.children[1] );
                    break;
                case 'op_mul':
                    ret = execute( node.children[0] ) * execute( node.children[1] );
                    break;
                case 'op_neg':
                    ret = execute( node.children[0] ) * -1;
                    break;
            }
            break;
            
        case 'node_var':
            ret = getvar(node.value);
            break;
            
        case 'node_const':
            ret = Number(node.value);
            break;
        
        case 'node_str':
            ret = node.value;
            break;
        
        case 'node_method':
            switch(node.value) {
                case 'x':
                    if(!JXG.exists(variables[node.children[0]])) {
                        _error(node.children[0] + ' is undefined.');
                        ret = NaN;
                    } else if(!JXG.exists(variables[node.children[0]].X)) {
                        _error(node.children[0] + ' has no property \'X\'.');
                        ret = NaN;
                    } else
                        ret = variables[node.children[0]].X();
                    break;
                case 'y':
                    if(!JXG.exists(variables[node.children[0]])) {
                        _error(node.children[0] + ' is undefined.');
                        ret = NaN;
                    } else if(!JXG.exists(variables[node.children[0]].Y)) {
                        _error(node.children[0] + ' has no property \'Y\'.');
                        ret = NaN;
                    } else
                        ret = variables[node.children[0]].Y();
                    break;
            }
            break;
    }
    
    return ret;
};

/*
	Default template driver for JS/CC generated parsers running as
	browser-based JavaScript/ECMAScript applications.
	
	WARNING: 	This parser template will not run as console and has lesser
				features for debugging than the console derivates for the
				various JavaScript platforms.
	
	Features:
	- Parser trace messages
	- Integrated panic-mode error recovery
	
	Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
	
	This is in the public domain.
*/

var jessie_dbg_withtrace		= false;
var jessie_dbg_string			= new String();

function __jessiedbg_print( text )
{
	jessie_dbg_string += text + "\n";
}

function __jessielex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 43;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 13 || info.src.charCodeAt( pos ) == 32 ) state = 1;
		else if( info.src.charCodeAt( pos ) == 35 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 4;
		else if( info.src.charCodeAt( pos ) == 42 ) state = 5;
		else if( info.src.charCodeAt( pos ) == 43 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 44 ) state = 7;
		else if( info.src.charCodeAt( pos ) == 45 ) state = 8;
		else if( info.src.charCodeAt( pos ) == 47 ) state = 9;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 10;
		else if( info.src.charCodeAt( pos ) == 59 ) state = 11;
		else if( info.src.charCodeAt( pos ) == 60 ) state = 12;
		else if( info.src.charCodeAt( pos ) == 61 ) state = 13;
		else if( info.src.charCodeAt( pos ) == 62 ) state = 14;
		else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 66 ) || ( info.src.charCodeAt( pos ) >= 71 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 84 ) || info.src.charCodeAt( pos ) == 86 || info.src.charCodeAt( pos ) == 90 || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 98 ) || ( info.src.charCodeAt( pos ) >= 103 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 116 ) || info.src.charCodeAt( pos ) == 118 || ( info.src.charCodeAt( pos ) >= 120 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 88 ) state = 16;
		else if( info.src.charCodeAt( pos ) == 89 ) state = 17;
		else if( info.src.charCodeAt( pos ) == 123 ) state = 18;
		else if( info.src.charCodeAt( pos ) == 125 ) state = 19;
		else if( info.src.charCodeAt( pos ) == 33 ) state = 33;
		else if( info.src.charCodeAt( pos ) == 68 || info.src.charCodeAt( pos ) == 100 ) state = 34;
		else if( info.src.charCodeAt( pos ) == 39 ) state = 35;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 36;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 37;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 43;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 48;
		else if( info.src.charCodeAt( pos ) == 87 || info.src.charCodeAt( pos ) == 119 ) state = 52;
		else if( info.src.charCodeAt( pos ) == 67 || info.src.charCodeAt( pos ) == 99 ) state = 55;
		else if( info.src.charCodeAt( pos ) == 70 || info.src.charCodeAt( pos ) == 102 ) state = 58;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		state = -1;
		match = 28;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 26;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 27;
		match_pos = pos;
		break;

	case 5:
		state = -1;
		match = 24;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 21;
		match_pos = pos;
		break;

	case 7:
		state = -1;
		match = 25;
		match_pos = pos;
		break;

	case 8:
		state = -1;
		match = 22;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 23;
		match_pos = pos;
		break;

	case 10:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 10;
		else if( info.src.charCodeAt( pos ) == 46 ) state = 22;
		else state = -1;
		match = 31;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 13;
		match_pos = pos;
		break;

	case 12:
		if( info.src.charCodeAt( pos ) == 61 ) state = 23;
		else state = -1;
		match = 20;
		match_pos = pos;
		break;

	case 13:
		if( info.src.charCodeAt( pos ) == 61 ) state = 24;
		else state = -1;
		match = 14;
		match_pos = pos;
		break;

	case 14:
		if( info.src.charCodeAt( pos ) == 61 ) state = 25;
		else state = -1;
		match = 19;
		match_pos = pos;
		break;

	case 15:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 16:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 17:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 18:
		state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 19:
		state = -1;
		match = 12;
		match_pos = pos;
		break;

	case 20:
		state = -1;
		match = 16;
		match_pos = pos;
		break;

	case 21:
		if( info.src.charCodeAt( pos ) == 39 ) state = 35;
		else state = -1;
		match = 30;
		match_pos = pos;
		break;

	case 22:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 22;
		else state = -1;
		match = 32;
		match_pos = pos;
		break;

	case 23:
		state = -1;
		match = 17;
		match_pos = pos;
		break;

	case 24:
		state = -1;
		match = 15;
		match_pos = pos;
		break;

	case 25:
		state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 26:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 27:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 28:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 29:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 30:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 31:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 32:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 33:
		if( info.src.charCodeAt( pos ) == 61 ) state = 20;
		else state = -1;
		break;

	case 34:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 26;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 35:
		if( info.src.charCodeAt( pos ) == 39 ) state = 21;
		else if( ( info.src.charCodeAt( pos ) >= 0 && info.src.charCodeAt( pos ) <= 38 ) || ( info.src.charCodeAt( pos ) >= 40 && info.src.charCodeAt( pos ) <= 254 ) ) state = 35;
		else state = -1;
		break;

	case 36:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 69 ) || ( info.src.charCodeAt( pos ) >= 71 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 101 ) || ( info.src.charCodeAt( pos ) >= 103 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 70 || info.src.charCodeAt( pos ) == 102 ) state = 27;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 37:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) ) state = 22;
		else state = -1;
		break;

	case 38:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 28;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 39:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 29;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 40:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 30;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 41:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 31;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 42:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 32;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 43:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 82 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 114 ) || ( info.src.charCodeAt( pos ) >= 116 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 115 ) state = 38;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 44:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 82 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 114 ) || ( info.src.charCodeAt( pos ) >= 116 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 83 || info.src.charCodeAt( pos ) == 115 ) state = 39;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 45:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 40;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 46:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 41;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 47:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 78 ) || ( info.src.charCodeAt( pos ) >= 80 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 110 ) || ( info.src.charCodeAt( pos ) >= 112 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 79 || info.src.charCodeAt( pos ) == 111 ) state = 42;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 48:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 107 ) || ( info.src.charCodeAt( pos ) >= 109 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 76 || info.src.charCodeAt( pos ) == 108 ) state = 44;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 49:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 45;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 50:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 66 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 98 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 65 || info.src.charCodeAt( pos ) == 97 ) state = 46;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 51:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 72 ) || ( info.src.charCodeAt( pos ) >= 74 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 104 ) || ( info.src.charCodeAt( pos ) >= 106 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 73 || info.src.charCodeAt( pos ) == 105 ) state = 47;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 52:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 71 ) || ( info.src.charCodeAt( pos ) >= 73 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 103 ) || ( info.src.charCodeAt( pos ) >= 105 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 72 || info.src.charCodeAt( pos ) == 104 ) state = 49;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 53:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 68 ) || ( info.src.charCodeAt( pos ) >= 70 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 100 ) || ( info.src.charCodeAt( pos ) >= 102 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 69 || info.src.charCodeAt( pos ) == 101 ) state = 50;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 54:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 83 ) || ( info.src.charCodeAt( pos ) >= 85 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 115 ) || ( info.src.charCodeAt( pos ) >= 117 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 84 || info.src.charCodeAt( pos ) == 116 ) state = 51;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 55:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 83 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 113 ) || ( info.src.charCodeAt( pos ) >= 115 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 82 || info.src.charCodeAt( pos ) == 114 ) state = 53;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 56:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 66 ) || ( info.src.charCodeAt( pos ) >= 68 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 98 ) || ( info.src.charCodeAt( pos ) >= 100 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 67 || info.src.charCodeAt( pos ) == 99 ) state = 54;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 57:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 77 ) || ( info.src.charCodeAt( pos ) >= 79 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 109 ) || ( info.src.charCodeAt( pos ) >= 111 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 78 || info.src.charCodeAt( pos ) == 110 ) state = 56;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

	case 58:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 84 ) || ( info.src.charCodeAt( pos ) >= 86 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 116 ) || ( info.src.charCodeAt( pos ) >= 118 && info.src.charCodeAt( pos ) <= 122 ) ) state = 15;
		else if( info.src.charCodeAt( pos ) == 85 || info.src.charCodeAt( pos ) == 117 ) state = 57;
		else state = -1;
		match = 29;
		match_pos = pos;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		
switch( match )
{
	case 30:
		{
		 info.att = info.att.substr( 1, info.att.length - 2 );
                                                                                info.att = info.att.replace( /''/g, "\'" );    
		}
		break;

}


	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __jessieparse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* Program' */, 1 ),
	new Array( 33/* Program */, 2 ),
	new Array( 33/* Program */, 0 ),
	new Array( 35/* Stmt_List */, 2 ),
	new Array( 35/* Stmt_List */, 0 ),
	new Array( 36/* Param_List */, 3 ),
	new Array( 36/* Param_List */, 1 ),
	new Array( 38/* Param_Def_List */, 3 ),
	new Array( 38/* Param_Def_List */, 1 ),
	new Array( 38/* Param_Def_List */, 0 ),
	new Array( 34/* Stmt */, 3 ),
	new Array( 34/* Stmt */, 5 ),
	new Array( 34/* Stmt */, 3 ),
	new Array( 34/* Stmt */, 5 ),
	new Array( 34/* Stmt */, 3 ),
	new Array( 34/* Stmt */, 4 ),
	new Array( 34/* Stmt */, 2 ),
	new Array( 34/* Stmt */, 3 ),
	new Array( 34/* Stmt */, 1 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 3 ),
	new Array( 37/* Expression */, 1 ),
	new Array( 39/* AddSubExp */, 3 ),
	new Array( 39/* AddSubExp */, 3 ),
	new Array( 39/* AddSubExp */, 1 ),
	new Array( 40/* MulDivExp */, 3 ),
	new Array( 40/* MulDivExp */, 3 ),
	new Array( 40/* MulDivExp */, 1 ),
	new Array( 41/* NegExp */, 2 ),
	new Array( 41/* NegExp */, 1 ),
	new Array( 42/* Value */, 1 ),
	new Array( 42/* Value */, 1 ),
	new Array( 42/* Value */, 1 ),
	new Array( 42/* Value */, 3 ),
	new Array( 42/* Value */, 1 ),
	new Array( 42/* Value */, 4 ),
	new Array( 42/* Value */, 7 ),
	new Array( 42/* Value */, 4 ),
	new Array( 42/* Value */, 4 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 43/* "$" */,-2 , 2/* "IF" */,-2 , 4/* "WHILE" */,-2 , 5/* "DO" */,-2 , 8/* "USE" */,-2 , 29/* "Identifier" */,-2 , 11/* "{" */,-2 , 13/* ";" */,-2 , 22/* "-" */,-2 , 31/* "Integer" */,-2 , 32/* "Float" */,-2 , 26/* "(" */,-2 , 30/* "String" */,-2 , 6/* "CREATE" */,-2 , 7/* "FUNCTION" */,-2 , 9/* "X" */,-2 , 10/* "Y" */,-2 ),
	/* State 1 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 , 43/* "$" */,0 ),
	/* State 2 */ new Array( 43/* "$" */,-1 , 2/* "IF" */,-1 , 4/* "WHILE" */,-1 , 5/* "DO" */,-1 , 8/* "USE" */,-1 , 29/* "Identifier" */,-1 , 11/* "{" */,-1 , 13/* ";" */,-1 , 22/* "-" */,-1 , 31/* "Integer" */,-1 , 32/* "Float" */,-1 , 26/* "(" */,-1 , 30/* "String" */,-1 , 6/* "CREATE" */,-1 , 7/* "FUNCTION" */,-1 , 9/* "X" */,-1 , 10/* "Y" */,-1 ),
	/* State 3 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 4 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 5 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 6 */ new Array( 29/* "Identifier" */,28 ),
	/* State 7 */ new Array( 14/* "=" */,29 , 13/* ";" */,-36 , 15/* "==" */,-36 , 20/* "<" */,-36 , 19/* ">" */,-36 , 17/* "<=" */,-36 , 18/* ">=" */,-36 , 16/* "!=" */,-36 , 22/* "-" */,-36 , 21/* "+" */,-36 , 24/* "*" */,-36 , 23/* "/" */,-36 ),
	/* State 8 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 13/* ";" */,36 ),
	/* State 9 */ new Array( 12/* "}" */,-4 , 2/* "IF" */,-4 , 4/* "WHILE" */,-4 , 5/* "DO" */,-4 , 8/* "USE" */,-4 , 29/* "Identifier" */,-4 , 11/* "{" */,-4 , 13/* ";" */,-4 , 22/* "-" */,-4 , 31/* "Integer" */,-4 , 32/* "Float" */,-4 , 26/* "(" */,-4 , 30/* "String" */,-4 , 6/* "CREATE" */,-4 , 7/* "FUNCTION" */,-4 , 9/* "X" */,-4 , 10/* "Y" */,-4 ),
	/* State 10 */ new Array( 43/* "$" */,-18 , 2/* "IF" */,-18 , 4/* "WHILE" */,-18 , 5/* "DO" */,-18 , 8/* "USE" */,-18 , 29/* "Identifier" */,-18 , 11/* "{" */,-18 , 13/* ";" */,-18 , 22/* "-" */,-18 , 31/* "Integer" */,-18 , 32/* "Float" */,-18 , 26/* "(" */,-18 , 30/* "String" */,-18 , 6/* "CREATE" */,-18 , 7/* "FUNCTION" */,-18 , 9/* "X" */,-18 , 10/* "Y" */,-18 , 3/* "ELSE" */,-18 , 12/* "}" */,-18 ),
	/* State 11 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-25 , 15/* "==" */,-25 , 20/* "<" */,-25 , 19/* ">" */,-25 , 17/* "<=" */,-25 , 18/* ">=" */,-25 , 16/* "!=" */,-25 , 2/* "IF" */,-25 , 4/* "WHILE" */,-25 , 5/* "DO" */,-25 , 8/* "USE" */,-25 , 29/* "Identifier" */,-25 , 11/* "{" */,-25 , 31/* "Integer" */,-25 , 32/* "Float" */,-25 , 26/* "(" */,-25 , 30/* "String" */,-25 , 6/* "CREATE" */,-25 , 7/* "FUNCTION" */,-25 , 9/* "X" */,-25 , 10/* "Y" */,-25 , 27/* ")" */,-25 , 25/* "," */,-25 ),
	/* State 12 */ new Array( 23/* "/" */,40 , 24/* "*" */,41 , 13/* ";" */,-28 , 15/* "==" */,-28 , 20/* "<" */,-28 , 19/* ">" */,-28 , 17/* "<=" */,-28 , 18/* ">=" */,-28 , 16/* "!=" */,-28 , 22/* "-" */,-28 , 21/* "+" */,-28 , 2/* "IF" */,-28 , 4/* "WHILE" */,-28 , 5/* "DO" */,-28 , 8/* "USE" */,-28 , 29/* "Identifier" */,-28 , 11/* "{" */,-28 , 31/* "Integer" */,-28 , 32/* "Float" */,-28 , 26/* "(" */,-28 , 30/* "String" */,-28 , 6/* "CREATE" */,-28 , 7/* "FUNCTION" */,-28 , 9/* "X" */,-28 , 10/* "Y" */,-28 , 27/* ")" */,-28 , 25/* "," */,-28 ),
	/* State 13 */ new Array( 13/* ";" */,-31 , 15/* "==" */,-31 , 20/* "<" */,-31 , 19/* ">" */,-31 , 17/* "<=" */,-31 , 18/* ">=" */,-31 , 16/* "!=" */,-31 , 22/* "-" */,-31 , 21/* "+" */,-31 , 24/* "*" */,-31 , 23/* "/" */,-31 , 2/* "IF" */,-31 , 4/* "WHILE" */,-31 , 5/* "DO" */,-31 , 8/* "USE" */,-31 , 29/* "Identifier" */,-31 , 11/* "{" */,-31 , 31/* "Integer" */,-31 , 32/* "Float" */,-31 , 26/* "(" */,-31 , 30/* "String" */,-31 , 6/* "CREATE" */,-31 , 7/* "FUNCTION" */,-31 , 9/* "X" */,-31 , 10/* "Y" */,-31 , 27/* ")" */,-31 , 25/* "," */,-31 ),
	/* State 14 */ new Array( 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 15 */ new Array( 13/* ";" */,-33 , 15/* "==" */,-33 , 20/* "<" */,-33 , 19/* ">" */,-33 , 17/* "<=" */,-33 , 18/* ">=" */,-33 , 16/* "!=" */,-33 , 22/* "-" */,-33 , 21/* "+" */,-33 , 24/* "*" */,-33 , 23/* "/" */,-33 , 2/* "IF" */,-33 , 4/* "WHILE" */,-33 , 5/* "DO" */,-33 , 8/* "USE" */,-33 , 29/* "Identifier" */,-33 , 11/* "{" */,-33 , 31/* "Integer" */,-33 , 32/* "Float" */,-33 , 26/* "(" */,-33 , 30/* "String" */,-33 , 6/* "CREATE" */,-33 , 7/* "FUNCTION" */,-33 , 9/* "X" */,-33 , 10/* "Y" */,-33 , 27/* ")" */,-33 , 25/* "," */,-33 ),
	/* State 16 */ new Array( 13/* ";" */,-34 , 15/* "==" */,-34 , 20/* "<" */,-34 , 19/* ">" */,-34 , 17/* "<=" */,-34 , 18/* ">=" */,-34 , 16/* "!=" */,-34 , 22/* "-" */,-34 , 21/* "+" */,-34 , 24/* "*" */,-34 , 23/* "/" */,-34 , 2/* "IF" */,-34 , 4/* "WHILE" */,-34 , 5/* "DO" */,-34 , 8/* "USE" */,-34 , 29/* "Identifier" */,-34 , 11/* "{" */,-34 , 31/* "Integer" */,-34 , 32/* "Float" */,-34 , 26/* "(" */,-34 , 30/* "String" */,-34 , 6/* "CREATE" */,-34 , 7/* "FUNCTION" */,-34 , 9/* "X" */,-34 , 10/* "Y" */,-34 , 27/* ")" */,-34 , 25/* "," */,-34 ),
	/* State 17 */ new Array( 13/* ";" */,-35 , 15/* "==" */,-35 , 20/* "<" */,-35 , 19/* ">" */,-35 , 17/* "<=" */,-35 , 18/* ">=" */,-35 , 16/* "!=" */,-35 , 22/* "-" */,-35 , 21/* "+" */,-35 , 24/* "*" */,-35 , 23/* "/" */,-35 , 2/* "IF" */,-35 , 4/* "WHILE" */,-35 , 5/* "DO" */,-35 , 8/* "USE" */,-35 , 29/* "Identifier" */,-35 , 11/* "{" */,-35 , 31/* "Integer" */,-35 , 32/* "Float" */,-35 , 26/* "(" */,-35 , 30/* "String" */,-35 , 6/* "CREATE" */,-35 , 7/* "FUNCTION" */,-35 , 9/* "X" */,-35 , 10/* "Y" */,-35 , 27/* ")" */,-35 , 25/* "," */,-35 ),
	/* State 18 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 19 */ new Array( 13/* ";" */,-38 , 15/* "==" */,-38 , 20/* "<" */,-38 , 19/* ">" */,-38 , 17/* "<=" */,-38 , 18/* ">=" */,-38 , 16/* "!=" */,-38 , 22/* "-" */,-38 , 21/* "+" */,-38 , 24/* "*" */,-38 , 23/* "/" */,-38 , 2/* "IF" */,-38 , 4/* "WHILE" */,-38 , 5/* "DO" */,-38 , 8/* "USE" */,-38 , 29/* "Identifier" */,-38 , 11/* "{" */,-38 , 31/* "Integer" */,-38 , 32/* "Float" */,-38 , 26/* "(" */,-38 , 30/* "String" */,-38 , 6/* "CREATE" */,-38 , 7/* "FUNCTION" */,-38 , 9/* "X" */,-38 , 10/* "Y" */,-38 , 27/* ")" */,-38 , 25/* "," */,-38 ),
	/* State 20 */ new Array( 26/* "(" */,44 ),
	/* State 21 */ new Array( 26/* "(" */,45 ),
	/* State 22 */ new Array( 26/* "(" */,46 ),
	/* State 23 */ new Array( 26/* "(" */,47 ),
	/* State 24 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 25 */ new Array( 2/* "IF" */,-36 , 4/* "WHILE" */,-36 , 5/* "DO" */,-36 , 8/* "USE" */,-36 , 29/* "Identifier" */,-36 , 11/* "{" */,-36 , 13/* ";" */,-36 , 22/* "-" */,-36 , 31/* "Integer" */,-36 , 32/* "Float" */,-36 , 26/* "(" */,-36 , 30/* "String" */,-36 , 6/* "CREATE" */,-36 , 7/* "FUNCTION" */,-36 , 9/* "X" */,-36 , 10/* "Y" */,-36 , 15/* "==" */,-36 , 20/* "<" */,-36 , 19/* ">" */,-36 , 17/* "<=" */,-36 , 18/* ">=" */,-36 , 16/* "!=" */,-36 , 21/* "+" */,-36 , 24/* "*" */,-36 , 23/* "/" */,-36 , 27/* ")" */,-36 , 25/* "," */,-36 ),
	/* State 26 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 27 */ new Array( 4/* "WHILE" */,50 ),
	/* State 28 */ new Array( 13/* ";" */,51 ),
	/* State 29 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 30 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 31 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 32 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 33 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 34 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 35 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 36 */ new Array( 43/* "$" */,-16 , 2/* "IF" */,-16 , 4/* "WHILE" */,-16 , 5/* "DO" */,-16 , 8/* "USE" */,-16 , 29/* "Identifier" */,-16 , 11/* "{" */,-16 , 13/* ";" */,-16 , 22/* "-" */,-16 , 31/* "Integer" */,-16 , 32/* "Float" */,-16 , 26/* "(" */,-16 , 30/* "String" */,-16 , 6/* "CREATE" */,-16 , 7/* "FUNCTION" */,-16 , 9/* "X" */,-16 , 10/* "Y" */,-16 , 3/* "ELSE" */,-16 , 12/* "}" */,-16 ),
	/* State 37 */ new Array( 12/* "}" */,60 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 38 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 39 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 40 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 41 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 42 */ new Array( 13/* ";" */,-32 , 15/* "==" */,-32 , 20/* "<" */,-32 , 19/* ">" */,-32 , 17/* "<=" */,-32 , 18/* ">=" */,-32 , 16/* "!=" */,-32 , 22/* "-" */,-32 , 21/* "+" */,-32 , 24/* "*" */,-32 , 23/* "/" */,-32 , 2/* "IF" */,-32 , 4/* "WHILE" */,-32 , 5/* "DO" */,-32 , 8/* "USE" */,-32 , 29/* "Identifier" */,-32 , 11/* "{" */,-32 , 31/* "Integer" */,-32 , 32/* "Float" */,-32 , 26/* "(" */,-32 , 30/* "String" */,-32 , 6/* "CREATE" */,-32 , 7/* "FUNCTION" */,-32 , 9/* "X" */,-32 , 10/* "Y" */,-32 , 27/* ")" */,-32 , 25/* "," */,-32 ),
	/* State 43 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 27/* ")" */,65 ),
	/* State 44 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 45 */ new Array( 29/* "Identifier" */,69 , 27/* ")" */,-9 , 25/* "," */,-9 ),
	/* State 46 */ new Array( 29/* "Identifier" */,70 ),
	/* State 47 */ new Array( 29/* "Identifier" */,71 ),
	/* State 48 */ new Array( 3/* "ELSE" */,72 , 43/* "$" */,-10 , 2/* "IF" */,-10 , 4/* "WHILE" */,-10 , 5/* "DO" */,-10 , 8/* "USE" */,-10 , 29/* "Identifier" */,-10 , 11/* "{" */,-10 , 13/* ";" */,-10 , 22/* "-" */,-10 , 31/* "Integer" */,-10 , 32/* "Float" */,-10 , 26/* "(" */,-10 , 30/* "String" */,-10 , 6/* "CREATE" */,-10 , 7/* "FUNCTION" */,-10 , 9/* "X" */,-10 , 10/* "Y" */,-10 , 12/* "}" */,-10 ),
	/* State 49 */ new Array( 43/* "$" */,-12 , 2/* "IF" */,-12 , 4/* "WHILE" */,-12 , 5/* "DO" */,-12 , 8/* "USE" */,-12 , 29/* "Identifier" */,-12 , 11/* "{" */,-12 , 13/* ";" */,-12 , 22/* "-" */,-12 , 31/* "Integer" */,-12 , 32/* "Float" */,-12 , 26/* "(" */,-12 , 30/* "String" */,-12 , 6/* "CREATE" */,-12 , 7/* "FUNCTION" */,-12 , 9/* "X" */,-12 , 10/* "Y" */,-12 , 3/* "ELSE" */,-12 , 12/* "}" */,-12 ),
	/* State 50 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 51 */ new Array( 43/* "$" */,-14 , 2/* "IF" */,-14 , 4/* "WHILE" */,-14 , 5/* "DO" */,-14 , 8/* "USE" */,-14 , 29/* "Identifier" */,-14 , 11/* "{" */,-14 , 13/* ";" */,-14 , 22/* "-" */,-14 , 31/* "Integer" */,-14 , 32/* "Float" */,-14 , 26/* "(" */,-14 , 30/* "String" */,-14 , 6/* "CREATE" */,-14 , 7/* "FUNCTION" */,-14 , 9/* "X" */,-14 , 10/* "Y" */,-14 , 3/* "ELSE" */,-14 , 12/* "}" */,-14 ),
	/* State 52 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 13/* ";" */,74 ),
	/* State 53 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-24 , 15/* "==" */,-24 , 20/* "<" */,-24 , 19/* ">" */,-24 , 17/* "<=" */,-24 , 18/* ">=" */,-24 , 16/* "!=" */,-24 , 2/* "IF" */,-24 , 4/* "WHILE" */,-24 , 5/* "DO" */,-24 , 8/* "USE" */,-24 , 29/* "Identifier" */,-24 , 11/* "{" */,-24 , 31/* "Integer" */,-24 , 32/* "Float" */,-24 , 26/* "(" */,-24 , 30/* "String" */,-24 , 6/* "CREATE" */,-24 , 7/* "FUNCTION" */,-24 , 9/* "X" */,-24 , 10/* "Y" */,-24 , 27/* ")" */,-24 , 25/* "," */,-24 ),
	/* State 54 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-23 , 15/* "==" */,-23 , 20/* "<" */,-23 , 19/* ">" */,-23 , 17/* "<=" */,-23 , 18/* ">=" */,-23 , 16/* "!=" */,-23 , 2/* "IF" */,-23 , 4/* "WHILE" */,-23 , 5/* "DO" */,-23 , 8/* "USE" */,-23 , 29/* "Identifier" */,-23 , 11/* "{" */,-23 , 31/* "Integer" */,-23 , 32/* "Float" */,-23 , 26/* "(" */,-23 , 30/* "String" */,-23 , 6/* "CREATE" */,-23 , 7/* "FUNCTION" */,-23 , 9/* "X" */,-23 , 10/* "Y" */,-23 , 27/* ")" */,-23 , 25/* "," */,-23 ),
	/* State 55 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-22 , 15/* "==" */,-22 , 20/* "<" */,-22 , 19/* ">" */,-22 , 17/* "<=" */,-22 , 18/* ">=" */,-22 , 16/* "!=" */,-22 , 2/* "IF" */,-22 , 4/* "WHILE" */,-22 , 5/* "DO" */,-22 , 8/* "USE" */,-22 , 29/* "Identifier" */,-22 , 11/* "{" */,-22 , 31/* "Integer" */,-22 , 32/* "Float" */,-22 , 26/* "(" */,-22 , 30/* "String" */,-22 , 6/* "CREATE" */,-22 , 7/* "FUNCTION" */,-22 , 9/* "X" */,-22 , 10/* "Y" */,-22 , 27/* ")" */,-22 , 25/* "," */,-22 ),
	/* State 56 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-21 , 15/* "==" */,-21 , 20/* "<" */,-21 , 19/* ">" */,-21 , 17/* "<=" */,-21 , 18/* ">=" */,-21 , 16/* "!=" */,-21 , 2/* "IF" */,-21 , 4/* "WHILE" */,-21 , 5/* "DO" */,-21 , 8/* "USE" */,-21 , 29/* "Identifier" */,-21 , 11/* "{" */,-21 , 31/* "Integer" */,-21 , 32/* "Float" */,-21 , 26/* "(" */,-21 , 30/* "String" */,-21 , 6/* "CREATE" */,-21 , 7/* "FUNCTION" */,-21 , 9/* "X" */,-21 , 10/* "Y" */,-21 , 27/* ")" */,-21 , 25/* "," */,-21 ),
	/* State 57 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-20 , 15/* "==" */,-20 , 20/* "<" */,-20 , 19/* ">" */,-20 , 17/* "<=" */,-20 , 18/* ">=" */,-20 , 16/* "!=" */,-20 , 2/* "IF" */,-20 , 4/* "WHILE" */,-20 , 5/* "DO" */,-20 , 8/* "USE" */,-20 , 29/* "Identifier" */,-20 , 11/* "{" */,-20 , 31/* "Integer" */,-20 , 32/* "Float" */,-20 , 26/* "(" */,-20 , 30/* "String" */,-20 , 6/* "CREATE" */,-20 , 7/* "FUNCTION" */,-20 , 9/* "X" */,-20 , 10/* "Y" */,-20 , 27/* ")" */,-20 , 25/* "," */,-20 ),
	/* State 58 */ new Array( 21/* "+" */,38 , 22/* "-" */,39 , 13/* ";" */,-19 , 15/* "==" */,-19 , 20/* "<" */,-19 , 19/* ">" */,-19 , 17/* "<=" */,-19 , 18/* ">=" */,-19 , 16/* "!=" */,-19 , 2/* "IF" */,-19 , 4/* "WHILE" */,-19 , 5/* "DO" */,-19 , 8/* "USE" */,-19 , 29/* "Identifier" */,-19 , 11/* "{" */,-19 , 31/* "Integer" */,-19 , 32/* "Float" */,-19 , 26/* "(" */,-19 , 30/* "String" */,-19 , 6/* "CREATE" */,-19 , 7/* "FUNCTION" */,-19 , 9/* "X" */,-19 , 10/* "Y" */,-19 , 27/* ")" */,-19 , 25/* "," */,-19 ),
	/* State 59 */ new Array( 12/* "}" */,-3 , 2/* "IF" */,-3 , 4/* "WHILE" */,-3 , 5/* "DO" */,-3 , 8/* "USE" */,-3 , 29/* "Identifier" */,-3 , 11/* "{" */,-3 , 13/* ";" */,-3 , 22/* "-" */,-3 , 31/* "Integer" */,-3 , 32/* "Float" */,-3 , 26/* "(" */,-3 , 30/* "String" */,-3 , 6/* "CREATE" */,-3 , 7/* "FUNCTION" */,-3 , 9/* "X" */,-3 , 10/* "Y" */,-3 ),
	/* State 60 */ new Array( 43/* "$" */,-17 , 2/* "IF" */,-17 , 4/* "WHILE" */,-17 , 5/* "DO" */,-17 , 8/* "USE" */,-17 , 29/* "Identifier" */,-17 , 11/* "{" */,-17 , 13/* ";" */,-17 , 22/* "-" */,-17 , 31/* "Integer" */,-17 , 32/* "Float" */,-17 , 26/* "(" */,-17 , 30/* "String" */,-17 , 6/* "CREATE" */,-17 , 7/* "FUNCTION" */,-17 , 9/* "X" */,-17 , 10/* "Y" */,-17 , 3/* "ELSE" */,-17 , 12/* "}" */,-17 ),
	/* State 61 */ new Array( 23/* "/" */,40 , 24/* "*" */,41 , 13/* ";" */,-27 , 15/* "==" */,-27 , 20/* "<" */,-27 , 19/* ">" */,-27 , 17/* "<=" */,-27 , 18/* ">=" */,-27 , 16/* "!=" */,-27 , 22/* "-" */,-27 , 21/* "+" */,-27 , 2/* "IF" */,-27 , 4/* "WHILE" */,-27 , 5/* "DO" */,-27 , 8/* "USE" */,-27 , 29/* "Identifier" */,-27 , 11/* "{" */,-27 , 31/* "Integer" */,-27 , 32/* "Float" */,-27 , 26/* "(" */,-27 , 30/* "String" */,-27 , 6/* "CREATE" */,-27 , 7/* "FUNCTION" */,-27 , 9/* "X" */,-27 , 10/* "Y" */,-27 , 27/* ")" */,-27 , 25/* "," */,-27 ),
	/* State 62 */ new Array( 23/* "/" */,40 , 24/* "*" */,41 , 13/* ";" */,-26 , 15/* "==" */,-26 , 20/* "<" */,-26 , 19/* ">" */,-26 , 17/* "<=" */,-26 , 18/* ">=" */,-26 , 16/* "!=" */,-26 , 22/* "-" */,-26 , 21/* "+" */,-26 , 2/* "IF" */,-26 , 4/* "WHILE" */,-26 , 5/* "DO" */,-26 , 8/* "USE" */,-26 , 29/* "Identifier" */,-26 , 11/* "{" */,-26 , 31/* "Integer" */,-26 , 32/* "Float" */,-26 , 26/* "(" */,-26 , 30/* "String" */,-26 , 6/* "CREATE" */,-26 , 7/* "FUNCTION" */,-26 , 9/* "X" */,-26 , 10/* "Y" */,-26 , 27/* ")" */,-26 , 25/* "," */,-26 ),
	/* State 63 */ new Array( 13/* ";" */,-30 , 15/* "==" */,-30 , 20/* "<" */,-30 , 19/* ">" */,-30 , 17/* "<=" */,-30 , 18/* ">=" */,-30 , 16/* "!=" */,-30 , 22/* "-" */,-30 , 21/* "+" */,-30 , 24/* "*" */,-30 , 23/* "/" */,-30 , 2/* "IF" */,-30 , 4/* "WHILE" */,-30 , 5/* "DO" */,-30 , 8/* "USE" */,-30 , 29/* "Identifier" */,-30 , 11/* "{" */,-30 , 31/* "Integer" */,-30 , 32/* "Float" */,-30 , 26/* "(" */,-30 , 30/* "String" */,-30 , 6/* "CREATE" */,-30 , 7/* "FUNCTION" */,-30 , 9/* "X" */,-30 , 10/* "Y" */,-30 , 27/* ")" */,-30 , 25/* "," */,-30 ),
	/* State 64 */ new Array( 13/* ";" */,-29 , 15/* "==" */,-29 , 20/* "<" */,-29 , 19/* ">" */,-29 , 17/* "<=" */,-29 , 18/* ">=" */,-29 , 16/* "!=" */,-29 , 22/* "-" */,-29 , 21/* "+" */,-29 , 24/* "*" */,-29 , 23/* "/" */,-29 , 2/* "IF" */,-29 , 4/* "WHILE" */,-29 , 5/* "DO" */,-29 , 8/* "USE" */,-29 , 29/* "Identifier" */,-29 , 11/* "{" */,-29 , 31/* "Integer" */,-29 , 32/* "Float" */,-29 , 26/* "(" */,-29 , 30/* "String" */,-29 , 6/* "CREATE" */,-29 , 7/* "FUNCTION" */,-29 , 9/* "X" */,-29 , 10/* "Y" */,-29 , 27/* ")" */,-29 , 25/* "," */,-29 ),
	/* State 65 */ new Array( 13/* ";" */,-37 , 15/* "==" */,-37 , 20/* "<" */,-37 , 19/* ">" */,-37 , 17/* "<=" */,-37 , 18/* ">=" */,-37 , 16/* "!=" */,-37 , 22/* "-" */,-37 , 21/* "+" */,-37 , 24/* "*" */,-37 , 23/* "/" */,-37 , 2/* "IF" */,-37 , 4/* "WHILE" */,-37 , 5/* "DO" */,-37 , 8/* "USE" */,-37 , 29/* "Identifier" */,-37 , 11/* "{" */,-37 , 31/* "Integer" */,-37 , 32/* "Float" */,-37 , 26/* "(" */,-37 , 30/* "String" */,-37 , 6/* "CREATE" */,-37 , 7/* "FUNCTION" */,-37 , 9/* "X" */,-37 , 10/* "Y" */,-37 , 27/* ")" */,-37 , 25/* "," */,-37 ),
	/* State 66 */ new Array( 25/* "," */,75 , 27/* ")" */,76 ),
	/* State 67 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 27/* ")" */,-6 , 25/* "," */,-6 ),
	/* State 68 */ new Array( 25/* "," */,77 , 27/* ")" */,78 ),
	/* State 69 */ new Array( 27/* ")" */,-8 , 25/* "," */,-8 ),
	/* State 70 */ new Array( 27/* ")" */,79 ),
	/* State 71 */ new Array( 27/* ")" */,80 ),
	/* State 72 */ new Array( 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 73 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 13/* ";" */,82 ),
	/* State 74 */ new Array( 43/* "$" */,-15 , 2/* "IF" */,-15 , 4/* "WHILE" */,-15 , 5/* "DO" */,-15 , 8/* "USE" */,-15 , 29/* "Identifier" */,-15 , 11/* "{" */,-15 , 13/* ";" */,-15 , 22/* "-" */,-15 , 31/* "Integer" */,-15 , 32/* "Float" */,-15 , 26/* "(" */,-15 , 30/* "String" */,-15 , 6/* "CREATE" */,-15 , 7/* "FUNCTION" */,-15 , 9/* "X" */,-15 , 10/* "Y" */,-15 , 3/* "ELSE" */,-15 , 12/* "}" */,-15 ),
	/* State 75 */ new Array( 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 29/* "Identifier" */,25 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 76 */ new Array( 13/* ";" */,-39 , 15/* "==" */,-39 , 20/* "<" */,-39 , 19/* ">" */,-39 , 17/* "<=" */,-39 , 18/* ">=" */,-39 , 16/* "!=" */,-39 , 22/* "-" */,-39 , 21/* "+" */,-39 , 24/* "*" */,-39 , 23/* "/" */,-39 , 2/* "IF" */,-39 , 4/* "WHILE" */,-39 , 5/* "DO" */,-39 , 8/* "USE" */,-39 , 29/* "Identifier" */,-39 , 11/* "{" */,-39 , 31/* "Integer" */,-39 , 32/* "Float" */,-39 , 26/* "(" */,-39 , 30/* "String" */,-39 , 6/* "CREATE" */,-39 , 7/* "FUNCTION" */,-39 , 9/* "X" */,-39 , 10/* "Y" */,-39 , 27/* ")" */,-39 , 25/* "," */,-39 ),
	/* State 77 */ new Array( 29/* "Identifier" */,84 ),
	/* State 78 */ new Array( 11/* "{" */,85 ),
	/* State 79 */ new Array( 13/* ";" */,-41 , 15/* "==" */,-41 , 20/* "<" */,-41 , 19/* ">" */,-41 , 17/* "<=" */,-41 , 18/* ">=" */,-41 , 16/* "!=" */,-41 , 22/* "-" */,-41 , 21/* "+" */,-41 , 24/* "*" */,-41 , 23/* "/" */,-41 , 2/* "IF" */,-41 , 4/* "WHILE" */,-41 , 5/* "DO" */,-41 , 8/* "USE" */,-41 , 29/* "Identifier" */,-41 , 11/* "{" */,-41 , 31/* "Integer" */,-41 , 32/* "Float" */,-41 , 26/* "(" */,-41 , 30/* "String" */,-41 , 6/* "CREATE" */,-41 , 7/* "FUNCTION" */,-41 , 9/* "X" */,-41 , 10/* "Y" */,-41 , 27/* ")" */,-41 , 25/* "," */,-41 ),
	/* State 80 */ new Array( 13/* ";" */,-42 , 15/* "==" */,-42 , 20/* "<" */,-42 , 19/* ">" */,-42 , 17/* "<=" */,-42 , 18/* ">=" */,-42 , 16/* "!=" */,-42 , 22/* "-" */,-42 , 21/* "+" */,-42 , 24/* "*" */,-42 , 23/* "/" */,-42 , 2/* "IF" */,-42 , 4/* "WHILE" */,-42 , 5/* "DO" */,-42 , 8/* "USE" */,-42 , 29/* "Identifier" */,-42 , 11/* "{" */,-42 , 31/* "Integer" */,-42 , 32/* "Float" */,-42 , 26/* "(" */,-42 , 30/* "String" */,-42 , 6/* "CREATE" */,-42 , 7/* "FUNCTION" */,-42 , 9/* "X" */,-42 , 10/* "Y" */,-42 , 27/* ")" */,-42 , 25/* "," */,-42 ),
	/* State 81 */ new Array( 43/* "$" */,-11 , 2/* "IF" */,-11 , 4/* "WHILE" */,-11 , 5/* "DO" */,-11 , 8/* "USE" */,-11 , 29/* "Identifier" */,-11 , 11/* "{" */,-11 , 13/* ";" */,-11 , 22/* "-" */,-11 , 31/* "Integer" */,-11 , 32/* "Float" */,-11 , 26/* "(" */,-11 , 30/* "String" */,-11 , 6/* "CREATE" */,-11 , 7/* "FUNCTION" */,-11 , 9/* "X" */,-11 , 10/* "Y" */,-11 , 3/* "ELSE" */,-11 , 12/* "}" */,-11 ),
	/* State 82 */ new Array( 43/* "$" */,-13 , 2/* "IF" */,-13 , 4/* "WHILE" */,-13 , 5/* "DO" */,-13 , 8/* "USE" */,-13 , 29/* "Identifier" */,-13 , 11/* "{" */,-13 , 13/* ";" */,-13 , 22/* "-" */,-13 , 31/* "Integer" */,-13 , 32/* "Float" */,-13 , 26/* "(" */,-13 , 30/* "String" */,-13 , 6/* "CREATE" */,-13 , 7/* "FUNCTION" */,-13 , 9/* "X" */,-13 , 10/* "Y" */,-13 , 3/* "ELSE" */,-13 , 12/* "}" */,-13 ),
	/* State 83 */ new Array( 16/* "!=" */,30 , 18/* ">=" */,31 , 17/* "<=" */,32 , 19/* ">" */,33 , 20/* "<" */,34 , 15/* "==" */,35 , 27/* ")" */,-5 , 25/* "," */,-5 ),
	/* State 84 */ new Array( 27/* ")" */,-7 , 25/* "," */,-7 ),
	/* State 85 */ new Array( 12/* "}" */,-4 , 2/* "IF" */,-4 , 4/* "WHILE" */,-4 , 5/* "DO" */,-4 , 8/* "USE" */,-4 , 29/* "Identifier" */,-4 , 11/* "{" */,-4 , 13/* ";" */,-4 , 22/* "-" */,-4 , 31/* "Integer" */,-4 , 32/* "Float" */,-4 , 26/* "(" */,-4 , 30/* "String" */,-4 , 6/* "CREATE" */,-4 , 7/* "FUNCTION" */,-4 , 9/* "X" */,-4 , 10/* "Y" */,-4 ),
	/* State 86 */ new Array( 12/* "}" */,87 , 2/* "IF" */,3 , 4/* "WHILE" */,4 , 5/* "DO" */,5 , 8/* "USE" */,6 , 29/* "Identifier" */,7 , 11/* "{" */,9 , 13/* ";" */,10 , 22/* "-" */,14 , 31/* "Integer" */,16 , 32/* "Float" */,17 , 26/* "(" */,18 , 30/* "String" */,19 , 6/* "CREATE" */,20 , 7/* "FUNCTION" */,21 , 9/* "X" */,22 , 10/* "Y" */,23 ),
	/* State 87 */ new Array( 13/* ";" */,-40 , 15/* "==" */,-40 , 20/* "<" */,-40 , 19/* ">" */,-40 , 17/* "<=" */,-40 , 18/* ">=" */,-40 , 16/* "!=" */,-40 , 22/* "-" */,-40 , 21/* "+" */,-40 , 24/* "*" */,-40 , 23/* "/" */,-40 , 2/* "IF" */,-40 , 4/* "WHILE" */,-40 , 5/* "DO" */,-40 , 8/* "USE" */,-40 , 29/* "Identifier" */,-40 , 11/* "{" */,-40 , 31/* "Integer" */,-40 , 32/* "Float" */,-40 , 26/* "(" */,-40 , 30/* "String" */,-40 , 6/* "CREATE" */,-40 , 7/* "FUNCTION" */,-40 , 9/* "X" */,-40 , 10/* "Y" */,-40 , 27/* ")" */,-40 , 25/* "," */,-40 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 33/* Program */,1 ),
	/* State 1 */ new Array( 34/* Stmt */,2 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array( 37/* Expression */,24 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 4 */ new Array( 37/* Expression */,26 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 5 */ new Array( 34/* Stmt */,27 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 6 */ new Array(  ),
	/* State 7 */ new Array(  ),
	/* State 8 */ new Array(  ),
	/* State 9 */ new Array( 35/* Stmt_List */,37 ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array(  ),
	/* State 12 */ new Array(  ),
	/* State 13 */ new Array(  ),
	/* State 14 */ new Array( 42/* Value */,42 ),
	/* State 15 */ new Array(  ),
	/* State 16 */ new Array(  ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array( 37/* Expression */,43 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  ),
	/* State 22 */ new Array(  ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array( 34/* Stmt */,48 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 25 */ new Array(  ),
	/* State 26 */ new Array( 34/* Stmt */,49 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 27 */ new Array(  ),
	/* State 28 */ new Array(  ),
	/* State 29 */ new Array( 37/* Expression */,52 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 30 */ new Array( 39/* AddSubExp */,53 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 31 */ new Array( 39/* AddSubExp */,54 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 32 */ new Array( 39/* AddSubExp */,55 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 33 */ new Array( 39/* AddSubExp */,56 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 34 */ new Array( 39/* AddSubExp */,57 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 35 */ new Array( 39/* AddSubExp */,58 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 36 */ new Array(  ),
	/* State 37 */ new Array( 34/* Stmt */,59 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 38 */ new Array( 40/* MulDivExp */,61 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 39 */ new Array( 40/* MulDivExp */,62 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 40 */ new Array( 41/* NegExp */,63 , 42/* Value */,15 ),
	/* State 41 */ new Array( 41/* NegExp */,64 , 42/* Value */,15 ),
	/* State 42 */ new Array(  ),
	/* State 43 */ new Array(  ),
	/* State 44 */ new Array( 36/* Param_List */,66 , 37/* Expression */,67 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 45 */ new Array( 38/* Param_Def_List */,68 ),
	/* State 46 */ new Array(  ),
	/* State 47 */ new Array(  ),
	/* State 48 */ new Array(  ),
	/* State 49 */ new Array(  ),
	/* State 50 */ new Array( 37/* Expression */,73 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 51 */ new Array(  ),
	/* State 52 */ new Array(  ),
	/* State 53 */ new Array(  ),
	/* State 54 */ new Array(  ),
	/* State 55 */ new Array(  ),
	/* State 56 */ new Array(  ),
	/* State 57 */ new Array(  ),
	/* State 58 */ new Array(  ),
	/* State 59 */ new Array(  ),
	/* State 60 */ new Array(  ),
	/* State 61 */ new Array(  ),
	/* State 62 */ new Array(  ),
	/* State 63 */ new Array(  ),
	/* State 64 */ new Array(  ),
	/* State 65 */ new Array(  ),
	/* State 66 */ new Array(  ),
	/* State 67 */ new Array(  ),
	/* State 68 */ new Array(  ),
	/* State 69 */ new Array(  ),
	/* State 70 */ new Array(  ),
	/* State 71 */ new Array(  ),
	/* State 72 */ new Array( 34/* Stmt */,81 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 73 */ new Array(  ),
	/* State 74 */ new Array(  ),
	/* State 75 */ new Array( 37/* Expression */,83 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 76 */ new Array(  ),
	/* State 77 */ new Array(  ),
	/* State 78 */ new Array(  ),
	/* State 79 */ new Array(  ),
	/* State 80 */ new Array(  ),
	/* State 81 */ new Array(  ),
	/* State 82 */ new Array(  ),
	/* State 83 */ new Array(  ),
	/* State 84 */ new Array(  ),
	/* State 85 */ new Array( 35/* Stmt_List */,86 ),
	/* State 86 */ new Array( 34/* Stmt */,59 , 37/* Expression */,8 , 39/* AddSubExp */,11 , 40/* MulDivExp */,12 , 41/* NegExp */,13 , 42/* Value */,15 ),
	/* State 87 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"Program'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"IF" /* Terminal symbol */,
	"ELSE" /* Terminal symbol */,
	"WHILE" /* Terminal symbol */,
	"DO" /* Terminal symbol */,
	"CREATE" /* Terminal symbol */,
	"FUNCTION" /* Terminal symbol */,
	"USE" /* Terminal symbol */,
	"X" /* Terminal symbol */,
	"Y" /* Terminal symbol */,
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
	"+" /* Terminal symbol */,
	"-" /* Terminal symbol */,
	"/" /* Terminal symbol */,
	"*" /* Terminal symbol */,
	"," /* Terminal symbol */,
	"(" /* Terminal symbol */,
	")" /* Terminal symbol */,
	"#" /* Terminal symbol */,
	"Identifier" /* Terminal symbol */,
	"String" /* Terminal symbol */,
	"Integer" /* Terminal symbol */,
	"Float" /* Terminal symbol */,
	"Program" /* Non-terminal symbol */,
	"Stmt" /* Non-terminal symbol */,
	"Stmt_List" /* Non-terminal symbol */,
	"Param_List" /* Non-terminal symbol */,
	"Expression" /* Non-terminal symbol */,
	"Param_Def_List" /* Non-terminal symbol */,
	"AddSubExp" /* Non-terminal symbol */,
	"MulDivExp" /* Non-terminal symbol */,
	"NegExp" /* Non-terminal symbol */,
	"Value" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __jessielex( info );

	while( true )
	{
		act = 89;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		if( jessie_dbg_withtrace && sstack.length > 0 )
		{
			__jessiedbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 89 )
		{
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 89 && la != 43 )
			{
				if( jessie_dbg_withtrace )
					__jessiedbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 89 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 89;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 89 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __jessielex( info );
			}
			
			if( act == 89 )
			{
				if( jessie_dbg_withtrace )
					__jessiedbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( jessie_dbg_withtrace )
				__jessiedbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 89 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{			
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __jessielex( info );
			
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		 execute( vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 2:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 3:
	{
		 rval = createNode('node_op', 'op_none', vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 4:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 5:
	{
		 rval = createNode('node_op', 'op_paramlst', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 6:
	{
		 rval = createNode('node_op', 'op_param', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 7:
	{
		 rval = createNode('node_op', 'op_paramdeflst', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 8:
	{
		 rval = createNode('node_op', 'op_paramdef', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 9:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 10:
	{
		 rval = createNode('node_op', 'op_if', vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 11:
	{
		 rval = createNode('node_op', 'op_if_else', vstack[ vstack.length - 4 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 12:
	{
		 rval = createNode('node_op', 'op_while', vstack[ vstack.length - 2 ], vstack[ vstack.length - 0 ] ); 
	}
	break;
	case 13:
	{
		 rval = createNode('node_op', 'op_for', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 14:
	{
		 rval = createNode('node_op', 'op_use', vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 15:
	{
		 rval = createNode('node_op', 'op_assign', vstack[ vstack.length - 4 ], vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 16:
	{
		 rval = createNode('node_op', 'op_noassign', vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 17:
	{
		 rval = vstack[ vstack.length - 2 ]; 
	}
	break;
	case 18:
	{
		 rval = createNode('node_op', 'op_none' ); 
	}
	break;
	case 19:
	{
		 rval = createNode('node_op', 'op_equ', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 20:
	{
		 rval = createNode('node_op', 'op_lot', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 21:
	{
		 rval = createNode('node_op', 'op_grt', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 22:
	{
		 rval = createNode('node_op', 'op_loe', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 23:
	{
		 rval = createNode('node_op', 'op_gre', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 24:
	{
		 rval = createNode('node_op', 'op_neq', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 25:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 26:
	{
		 rval = createNode('node_op', 'op_sub', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 27:
	{
		 rval = createNode('node_op', 'op_add', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 28:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 29:
	{
		 rval = createNode('node_op', 'op_mul', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 30:
	{
		 rval = createNode('node_op', 'op_div', vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 31:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 32:
	{
		 rval = createNode('node_op', 'op_neg', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 33:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 34:
	{
		 rval = createNode('node_const', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 35:
	{
		 rval = createNode('node_const', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 36:
	{
		 rval = createNode('node_var', vstack[ vstack.length - 1 ] ); 
	}
	break;
	case 37:
	{
		 rval = vstack[ vstack.length - 2 ]; 
	}
	break;
	case 38:
	{
		 rval = createNode('node_str', vstack[ vstack.length - 1 ]); 
	}
	break;
	case 39:
	{
		 rval = createNode('node_op', 'op_create', vstack[ vstack.length - 2 ] ); 
	}
	break;
	case 40:
	{
		 rval = createNode('node_op', 'op_function', vstack[ vstack.length - 5 ], vstack[ vstack.length - 2 ]); 
	}
	break;
	case 41:
	{
		 rval = createNode('node_method', 'x', vstack[ vstack.length - 2 ]); 
	}
	break;
	case 42:
	{
		 rval = createNode('node_method', 'y', vstack[ vstack.length - 2 ]); 
	}
	break;
}



			if( jessie_dbg_withtrace )
				__jessiedbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( act == 0 )
				break;
				
			if( jessie_dbg_withtrace )
				__jessiedbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
		
		if( jessie_dbg_withtrace )
		{		
			alert( jessie_dbg_string );
			jessie_dbg_string = new String();
		}
	}

	if( jessie_dbg_withtrace )
	{
		__jessiedbg_print( "\nParse complete." );
		alert( jessie_dbg_string );
	}
	
	return err_cnt;
}



