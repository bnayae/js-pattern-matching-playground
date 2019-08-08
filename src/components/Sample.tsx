// credit: https://blog.logrocket.com/javascript-typeof-2511d53a1a62/
//         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//         https://aliolicode.com/2016/04/23/type-checking-typescript/

import * as React from 'react';
import { bool } from 'prop-types';

export interface IFoo {
    readonly a: string;
}

function IFooTypeGuard(arg: any): arg is IFoo {
    return arg.a !== undefined;
}

export interface IBar extends IFoo {
    readonly b: number;
    readonly c?: boolean;
}

function IBarTypeGuard(arg: any): arg is IBar {
    return arg.a !== undefined &&
        arg.b !== undefined;
}

export interface ISampleProps {
    readonly title: string;
    readonly data?: (() => string) | string | number | boolean | IFoo | IBar | string[] | IFoo[] | IBar[]
}

const Sample = (props: ISampleProps) => {
    const match: (candidate?: any) => string = (candidate?: any) => {
        if (!candidate) {
            return 'empty'
        }

        switch (typeof candidate) {
            case 'number': {
                return 'is number';
            }
            case 'boolean': {
                return 'is boolean';
            }
            case 'string': {
                return 'is string';
            }
            case 'function': {
                return 'is function';
            }
        }

        if (IBarTypeGuard(candidate)) { // order is matters
            return "is Bar";
        }
        if (IFooTypeGuard(candidate)) { // order is matters
            return "is Foo";
        }

        // if (isOf<IBar>(candidate)) { // order is matters
        //     return "is Bar";
        // }
        // if (isOf<IFoo>(candidate)) {
        //     return "is Foo";
        // }

        if (Array.isArray(candidate)) {
            const itemType: string = match(candidate[0]);
            if (itemType) {
                return `array of ${itemType}`;
            }
            return 'unknown match array';
        }
        return `[${JSON.stringify(candidate)}] is unknown match, TYPE: ${typeof candidate}`;
    };

    return (
        <div>
            <div>{props.title}</div>
            <div>{match(props.data)}</div>
            <hr />
        </div>
    );
}

export default Sample;