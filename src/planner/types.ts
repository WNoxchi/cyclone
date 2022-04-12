/**
 * General parameters
 */

export interface IMandrelParameters {
    diameter: number;
    windLength: number;
}

export interface ITowParameters {
    width: number;
    thickness: number;
}

/**
 * Layer-specific parameters
 */

export const enum ELayerType {
    HOOP = 'hoop',
    HELICAL = 'helical'
}

export type THoopLayer = {
    windType: ELayerType.HOOP;
}

export type THelicalLayer = {
    windType: ELayerType.HELICAL;
    windAngle: number;
    patternNumber: number;
    skipIndex: number;
} 

export type TLayerParameters = THoopLayer | THelicalLayer;

export interface ILayerParameters<TLayerSpecificParameters extends TLayerParameters> {
    parameters: TLayerSpecificParameters;
    mandrelParameters: IMandrelParameters;
    towParameters: ITowParameters;
}

/**
 * Whole wind definition
 */

export interface IWindParameters {
    layers: TLayerParameters[];
    mandrelParameters: IMandrelParameters;
    towParameters: ITowParameters;
    defaultFeedRate: number;
}


/**
 *  Helpers types
 */

export const enum ECoordinateAxes {
    CARRIAGE = 'carriage',
    MANDREL = 'mandrel',
    DELIVERY_HEAD = 'deliveryHead'
}

export type TCoordinateAxes = Record<ECoordinateAxes, number>;

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type TCoordinate = AtLeastOne<TCoordinateAxes>;

export const AxisLookup: Record<keyof TCoordinateAxes, string> = {
    [ECoordinateAxes.CARRIAGE]: 'X',
    [ECoordinateAxes.MANDREL]: 'Y',
    [ECoordinateAxes.DELIVERY_HEAD]: 'Z'
}