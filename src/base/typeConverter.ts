import { ITypeConverter, IResolutionContext } from "../interfaces/interfaces";

export class TypeConverter implements ITypeConverter {
    /**
     * Performs conversion from source to destination type.
     * @param {IResolutionContext} resolutionContext Resolution context.
     * @returns {any} Destination object.
     */
    public convert(resolutionContext: IResolutionContext): any {
        // NOTE BL Unfortunately, TypeScript/JavaScript do not support abstract base classes.
        //         This is just one way around, please convince me about a better solution.
        throw new Error('The TypeConverter.convert method is abstract. Use a TypeConverter extension class instead.');
    }
}