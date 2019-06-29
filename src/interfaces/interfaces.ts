export interface IProperty { // TODO Rename!
    name: string;
    sourcePropertyName: string;
    destinationPropertyName: string;
    level: number;
}

export interface ISourceProperty extends IProperty {
    children: ISourceProperty[];
    destination: IDestinationProperty;
}

export interface IDestinationTransformation {
    transformationType: number; // Ideal: AutoMapperJs.DestinationTransformationType (but not as easy as it appears to be);
    constant?: any;
    memberConfigurationOptionsFunc?: (opts: IMemberConfigurationOptions) => void;
    sourceMemberConfigurationOptionsFunc?: (opts: ISourceMemberConfigurationOptions) => void;
}

export interface IDestinationProperty extends IProperty {
    child: IDestinationProperty;
    transformations: IDestinationTransformation[];
    conditionFunction: (sourceObject: any) => boolean;
    ignore: boolean;
    sourceMapping: boolean; // TODO is this still necessary?
}

export interface ICreateMapForMemberParameters {
    mapping: IMapping;
    propertyName: string;
    transformation: any;
    sourceMapping: boolean;
    fluentFunctions: ICreateMapFluentFunctions;
}

// [/v1.8]

interface IPropertyOld {
    name: string;
    metadata: IPropertyMetadata;
    level: number;
    sourceMapping: boolean;
    ignore: boolean;
    async: boolean;
    children?: IPropertyOld[];
    destinations?: IPropertyOld[];
    conversionValuesAndFunctions: any[];
    conditionFunction?: (sourceObject: any) => boolean;
}

interface IPropertyMetadata {
    mapping: IMapping;
    root: IPropertyOld;
    parent: IPropertyOld;
    destinations: {[name: string]: IPropertyDestinationMetadata};
    destinationCount: number;
}

interface IPropertyDestinationMetadata {
    source: IPropertyOld;
    destination: IPropertyOld;
}

export interface IMemberMappingMetaData {
    destination: string;
    source: string;
    transformation: IDestinationTransformation;
    sourceMapping: boolean;
    ignore: boolean;
    async: boolean;
    condition: (sourceObject: any) => boolean;
}

/**
 * Interface for returning an object with available 'sub' functions to enable method chaining (e.g. automapper.createMap().forMember().forMember() ...)
 */
export interface ICreateMapFluentFunctions {
    /**
     * Customize configuration for an individual destination member.
     * @param sourceProperty The destination member property name.
     * @param valueOrFunction The value or function to use for this individual member.
     * @returns {IAutoMapperCreateMapChainingFunctions}
     */
    forMember: (sourceProperty: string, valueOrFunction: any |
                 ((opts: IMemberConfigurationOptions) => any) |
                 ((opts: IMemberConfigurationOptions) => void)) => ICreateMapFluentFunctions;

    /**
     * Customize configuration for an individual source member.
     * @param sourceProperty The source member property name.
     * @param sourceMemberConfigFunction The function to use for this individual member.
     * @returns {IAutoMapperCreateMapChainingFunctions}
     */
    forSourceMember: (sourceProperty: string,
                      sourceMemberConfigFunction: ((opts: ISourceMemberConfigurationOptions) => any) |
                                                  ((opts: ISourceMemberConfigurationOptions) => void)
                     ) => ICreateMapFluentFunctions;

    /**
     * Customize configuration for all destination members.
     * @param func The function to use for this individual member.
     * @returns {IAutoMapperCreateMapChainingFunctions}
     */
    forAllMembers: (func: (destinationObject: any, destinationPropertyName: string, value: any) => void) => ICreateMapFluentFunctions;

    /**
     * Ignore all members not specified explicitly.
     */
    ignoreAllNonExisting: () => ICreateMapFluentFunctions;

    /**
     * Skip normal member mapping and convert using a custom type converter (instantiated during mapping).
     * @param typeConverterClassOrFunction The converter class or function to use when converting.
     */
    convertUsing: (typeConverterClassOrFunction: ((resolutionContext: IResolutionContext) => any) |
                                                 ((resolutionContext: IResolutionContext) => void) |
                                                 ITypeConverter |
                                                 (new() => ITypeConverter)
                  ) => void;

    /**
     * Specify to which class type AutoMapper should convert. When specified, AutoMapper will create an instance of the given type, instead of returning a new object literal.
     * @param typeClass The destination type class.
     * @returns {IAutoMapperCreateMapChainingFunctions}
     */
    convertToType: (typeClass: new () => any) => ICreateMapFluentFunctions;

    /**
     * Specify which profile should be used when mapping.
     * @param {string} profileName The profile name.
     * @returns {IAutoMapperCreateMapChainingFunctions}
     */
    withProfile: (profileName: string) => void;
}

/**
 * The mapping configuration for the current mapping keys/types.
 */
export interface IMapping {
    /** The mapping source key. */
    sourceKey: string;

    /** The mapping destination key. */
    destinationKey: string;

    /** The mappings for forAllMembers functions. */
    forAllMemberMappings: Array<(destinationObject: any, destinationPropertyName: string, value: any) => void>;

    // propertiesOld: IPropertyOld[];
    properties: ISourceProperty[];

    /**
     * Skip normal member mapping and convert using a type converter.
     * @param resolutionContext Context information regarding resolution of a destination value
     * @returns {any} Destination object.
     */
    typeConverterFunction: ((resolutionContext: IResolutionContext) => any) |
                           ((resolutionContext: IResolutionContext) => void);

    /** The source type class to convert from. */
    sourceTypeClass: any;

    /** The destination type class to convert to. */
    destinationTypeClass: any;

    /** The profile used when mapping. */
    profile?: IProfile;

    /** Whether or not to ignore all properties not specified using createMap. */
    ignoreAllNonExisting?: boolean;

    /*
     * PERFORMANCE ENHANCEMENTS
     */

    /**
     * Item mapping function to use.
     */
    mapItemFunction: IMapItemFunction | IAsyncMapItemFunction;
}

// export interface IMappingMapOptimized extends IMapping {
//     final: boolean;
//     forMemberMappingsArray: Array<IForMemberMapping>;
// }

/**
 * Context information regarding resolution of a destination value
 */
export interface IResolutionContext {
    /** Source value */
    sourceValue: any;

    /** Destination value */
    destinationValue: any;

    /** Source property name */
    sourcePropertyName?: string;

    /** Destination property name */
    destinationPropertyName?: string;

    /** Index of current collection mapping */
    arrayIndex?: number;
}

interface IMappingConfigurationOptions {
    /** The source object to map. */
    sourceObject: any;

    /** The source property to map. */
    sourcePropertyName: string;

    /**
     * The intermediate destination property value, used for stacking multiple for(Source)Member calls 
     * while elaborating the intermediate result.
     */
    intermediatePropertyValue: any;
}

/**
 * Configuration options for forMember mapping function.
 */
export interface IMemberConfigurationOptions extends ISourceMemberConfigurationOptions {
    /**
     * Map from a custom source property name.
     * @param sourcePropertyName The source property to map.
     */
    mapFrom: (sourcePropertyName: string) => void;

    /**
     * If specified, the property will only be mapped when the condition is fulfilled.
     */
    condition: (predicate: ((sourceObject: any) => boolean)) => void;
}

/**
 * Configuration options for forSourceMember mapping function.
 */
export interface ISourceMemberConfigurationOptions extends IMappingConfigurationOptions {
    /**
     * When this configuration function is used, the property is ignored
     * when mapping.
     */
    ignore: () => void;
}

/**
 * Converts source type to destination type instead of normal member mapping
 */
export interface ITypeConverter {
    /**
     * Performs conversion from source to destination type.
     * @param {IResolutionContext} resolutionContext Resolution context.
     * @returns {any} Destination object.
     */
    convert: (resolutionContext: IResolutionContext) => any;
}

/**
 * Defines a naming convention strategy.
 */
export interface INamingConvention {
    /** Regular expression on how to tokenize a member. */
    splittingExpression: RegExp;

    /** Character to separate on. */
    separatorCharacter: string;

    /**
     * Transformation function called when this convention is the destination naming convention.
     * @param {string[]} sourcePropertyNameParts Array containing tokenized source property name parts.
     * @returns {string} Destination property name
     */
    transformPropertyName: (sourcePropertyNameParts: string[]) => string;
}

/**
 * Configuration for profile-specific maps.
 */
export interface IConfiguration {
    /**
     * Add an existing profile
     * @param profile {IProfile} Profile to add.
     */
    addProfile(profile: IProfile): void;

    /**
     * Create a createMap curry function which expects only a destination key.
     * @param {string} sourceKey The map source key.
     * @returns {(destinationKey: string) => IAutoMapperCreateMapChainingFunctions}
     */
    createMap?(sourceKey: string): (destinationKey: string) => ICreateMapFluentFunctions;

    /**
     * Create a mapping profile.
     * @param {string} sourceKey The map source key.
     * @param {string} destinationKey The map destination key.
     * @returns {Core.IAutoMapperCreateMapChainingFunctions}
     */
    createMap?(sourceKey: string, destinationKey: string): ICreateMapFluentFunctions;
}

/**
 * Provides a named configuration for maps. Naming conventions become scoped per profile.
 */
export interface IProfile {
    /** Profile name */
    profileName: string;

    /** Naming convention for source members */
    sourceMemberNamingConvention: INamingConvention;

    /** Naming convention for destination members */
    destinationMemberNamingConvention: INamingConvention;

    /**
     * Implement this method in a derived class and call the CreateMap method to associate that map with this profile.
     * Avoid calling the AutoMapper class / automapper instance from this method. 
     */
    configure: () => void;
}

export interface IMapItemFunction {
    (mapping: IMapping, sourceObject: any, destinationObject: any): any;
}

export interface IAsyncMapItemFunction {
    (mapping: IMapping, sourceObject: any, destinationObject: any): void;
}