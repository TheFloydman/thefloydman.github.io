/**
 * GVAS Parser written by Floydman. Use at your own risk.
 */

class GvasProperty {

    value: any;
    type: string;
    name: string;

    /** Returns an int counting the number of bytes that were deserialized. */
    deserializeBody(buffer: ArrayBuffer, index: number): number {
        return 0;
    };

    /** Returns a Uint8Array representation of this property's body. */
    serializeBody(): Uint8Array {
        return new Uint8Array(0);
    }

}

class GvasUnknown extends GvasProperty {}

class LongNone extends GvasProperty {

    constructor() {
        super();
        this.type = 'None';
    }

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        return 4;
    }

    override serializeBody() {
        let buffer = new ArrayBuffer(4);
        let output = new Uint8Array(buffer);
        return output;
    }

}

class GvasString extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let dataView = new DataView(buffer);
        let index = startIndex;

        if (this.name || this.type) {
            let extendedValueLength = dataView.getInt32(index, true);
            index += 9;
        }
        let valueLength = dataView.getInt32(index, true);
        this.value = parseString(buffer, index);
        index += valueLength + 4;
        return index - startIndex;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let outputLength = 4 + (this.value.length > 0 ? this.value.length + 1 : 0);
        if (this.name || this.type) {
            outputLength += 9;
        }

        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);
        let index = 0;

        if (this.name || this.type) {
            let longValueLength = this.value.length > 0 ? this.value.length + 5 : 4;
            dataView.setUint32(index, longValueLength, true);
            index += 9;
        }

        let shortValueLength = this.value.length > 0 ? this.value.length + 1 : 0;
        dataView.setUint32(index, shortValueLength, true);

        if (shortValueLength > 0) {
            index += 4;
            output.set(textEncoder.encode(this.value), index);
        }

        return output;
    }
}

class GvasBoolean extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        const padding = 8;
        let index = startIndex;
        index += padding;
        this.value = new DataView(buffer).getInt8(index) == 0 ? false : true;
        index += 2;
        return index - startIndex;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let outputLength = 10;
        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        dataView.setUint8(8, this.value ? 1 : 0);

        return output;
    }

}

class GvasByte extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        const padding = 4;
        let index = startIndex;
        let longValueLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4 + padding;
        let descriptorLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4;
        let descriptor = new TextDecoder().decode(buffer.slice(index, index + descriptorLength - 1));
        index += descriptorLength + 1;
        let valueLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4;
        this.value = {
            descriptor: descriptor,
            details: new TextDecoder().decode(buffer.slice(index, index + valueLength - 1))
        };
        index += valueLength;
        return index - startIndex;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let outputLength = this.value.descriptor.length + this.value.details.length + 19;
        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);
        let index = 0;

        let longValueLength = 4 + this.value.details.length + 1;
        dataView.setUint32(index, longValueLength, true);
        index += 8;

        let descriptorLength = this.value.descriptor.length + 1;
        dataView.setUint32(index, descriptorLength, true);
        index += 4;

        let descriptor = textEncoder.encode(this.value.descriptor);
        output.set(descriptor, index);
        index += this.value.descriptor.length + 2;

        dataView.setUint32(index, this.value.details.length + 1, true);
        index += 4;

        let details = textEncoder.encode(this.value.details);
        output.set(details, index);

        return output;
    }

}

class GvasInteger extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let dataView = new DataView(buffer);
        let index = startIndex;
        let numberOfBytes = dataView.getUint32(index, true);
        index += 9;
        this.value = 0;
        switch (numberOfBytes) {
            case 8:
                this.value = {
                    bytes: numberOfBytes,
                    int: dataView.getBigInt64(index, true)
                };
                break;
            case 4:
                this.value = {
                    bytes: numberOfBytes,
                    int: dataView.getInt32(index, true)
                };
                break;
            case 2:
                this.value = {
                    bytes: numberOfBytes,
                    int: dataView.getInt16(index, true)
                };
                break;
            default:
                this.value = {
                    bytes: numberOfBytes,
                    int: dataView.getInt8(index)
                };
                break;
        }
        index += numberOfBytes;
        return index - startIndex;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let outputLength = this.value.bytes + 9;
        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);
        let index = 0;

        dataView.setUint32(index, this.value.bytes, true);
        index += 9;

        switch (this.value.bytes) {
            case 8:
                dataView.setBigInt64(index, this.value.int, true);
                break;
            case 4:
                dataView.setInt32(index, this.value.int, true);
                break;
            case 2:
                dataView.setInt16(index, this.value.int, true);
                break;
            default:
                dataView.setInt8(index, this.value.int);
                break;
        }

        return output;
    }

}

class GvasFloat extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let index = startIndex;
        let numberOfBytes = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 9;
        let dataView = new DataView(buffer.slice(index, index + numberOfBytes));
        index += numberOfBytes;
        this.value = { bytes: numberOfBytes, float: numberOfBytes == 4 ? dataView.getFloat32(0, true) : dataView.getFloat64(0, true) };
        return index - startIndex;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = this.value.bytes + 9;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;

        dataView.setUint32(index, this.value.bytes, true);
        index += 9;

        if (this.value.bytes == 4) {
            dataView.setFloat32(index, this.value.float, true);
        } else {
            dataView.setFloat64(index, this.value.float, true);
        }

        return output;
    }

}

class GvasMap extends GvasProperty {

    override value: {
        key: string,
        value: string,
        entries: Map<GvasProperty, GvasProperty>
    };

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let dataView = new DataView(buffer);
        let textDecoder = new TextDecoder();

        let index = startIndex;
        let firstValue = dataView.getBigUint64(index, true); // Length from end of valueType (including trailing 0 byte) + 1 to end of map.
        index += 8;
        let keyTypeLength = dataView.getUint32(index, true);
        index += 4;
        let keyType = textDecoder.decode(buffer.slice(index, index + keyTypeLength - 1));
        index += keyTypeLength;
        let valueTypeLength = dataView.getUint32(index, true);
        index += 4;
        let valueType = textDecoder.decode(buffer.slice(index, index + valueTypeLength - 1));
        index += valueTypeLength + 5;
        let numberOfEntries = dataView.getUint32(index, true);
        index += 4;

        let map = new Map<GvasProperty, GvasProperty>();
        for (let i = 0; i < numberOfEntries; i++) {
            let keyClass = propertyClasses.get(keyType);
            let valueClass = propertyClasses.get(valueType);
            if (keyClass == undefined || valueClass == undefined) {
                continue;
            }
            let entryKey = new(keyClass)();
            index += entryKey.deserializeBody(buffer, index);
            let entryValue = new(valueClass)();
            index += entryValue.deserializeBody(buffer, index);
            map.set(entryKey, entryValue);
        }

        this.value = {
            key: keyType,
            value: valueType,
            entries: map
        };

        return index - startIndex;
    }

    override serializeBody() {
        //35 too many
        let outputLength = this.name.length + this.type.length + this.value.key.length + this.value.value.length + 37;
        let outputArray = new Array<[Uint8Array, Uint8Array]>();
        this.value.entries.forEach((value, key, map) => {
            let encodedKey = serializeProperty(key);
            let encodedValue = serializeProperty(value);
            outputLength += encodedKey.byteLength + encodedValue.byteLength;
            outputArray.push([encodedKey, encodedValue]);
        });

        let textEncoder = new TextEncoder();
        let buffer = new ArrayBuffer(outputLength - this.name.length - this.type.length - 10);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);
        let index = 0;

        let bigFirstNumber = outputLength - this.name.length - this.type.length - this.value.key.length - this.value.value.length - 29;
        dataView.setUint32(index, bigFirstNumber, true);
        index += 8;
        dataView.setUint32(index, this.value.key.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.value.key), index);
        index += this.value.key.length + 1;
        dataView.setUint32(index, this.value.value.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.value.value), index);
        index += this.value.value.length + 6;
        dataView.setUint32(index, this.value.entries.size, true);
        index += 4;

        for (const pair of outputArray) {
            output.set(pair[0], index);
            index += pair[0].byteLength;
            output.set(pair[1], index)
            index += pair[1].byteLength;
        }

        return output;
    }

}

class GvasArray extends GvasProperty {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        const dataView = new DataView(buffer);
        const textDecoder = new TextDecoder();
        let index = startIndex;
        let totalArrayBytesQuantity = dataView.getUint32(index, true); // From declaration of number of entries to end.
        index += 8;
        let type1Length = dataView.getUint32(index, true);
        index += 4;
        let type1 = textDecoder.decode(buffer.slice(index, index + type1Length - 1));
        index += type1Length + 1;
        let numberOfEntries = dataView.getUint32(index, true);
        index += 4;
        let nameAgainLength = dataView.getUint32(index, true);
        index += 4;
        let nameAgain = textDecoder.decode(buffer.slice(index, index + nameAgainLength - 1));
        index += nameAgainLength;
        let type2Length = dataView.getUint32(index, true);
        index += 4;
        let type2 = textDecoder.decode(buffer.slice(index, index + type2Length - 1));
        index += type2Length;
        let totalEntriesBytesQuantity = dataView.getUint32(index, true);
        index += 4 + 4;
        let entryNameLength = dataView.getUint32(index, true);
        index += 4;
        let entryName = textDecoder.decode(buffer.slice(index, index + entryNameLength - 1));
        index += entryNameLength + 17;
        let output = index - startIndex;
        let properties = new Array<GvasProperty>();
        for (let i = 0; i < numberOfEntries; i++) {
            let propertyClass = propertyClasses.get(type1); 
            if (propertyClass == undefined) {
                continue;
            }
            let property = new(propertyClass)();
            let shortLength = property.deserializeBody(buffer, index);
            output += shortLength;
            properties.push(property);
            index += shortLength;
        }
        this.value = {
            type: type1,
            entryName: entryName,
            properties: properties
        };
        return output;
    }

    override serializeBody() {
        let outputLength = this.name.length + this.type.length + this.value.type.length + this.value.entryName.length + 59;
        let outputArray = new Array<Uint8Array>();
        let propertiesLength = 0;
        for (const property of this.value.properties) {
            let array = serializeProperty(property);
            propertiesLength += array.byteLength;
            outputArray.push(array);
        }
        outputLength += propertiesLength;

        let textEncoder = new TextEncoder();
        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, outputLength - this.value.type.length - 14, true);
        index += 8
        dataView.setUint32(index, this.value.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.value.type), index);
        index += this.value.type.length + 2;
        dataView.setUint32(index, this.value.properties.length, true);
        index += 4;
        dataView.setUint32(index, this.name.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.name), index);
        index += this.name.length + 1;
        dataView.setUint32(index, this.value.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.value.type), index);
        index += this.value.type.length + 1;
        dataView.setUint32(index, propertiesLength, true);
        index += 8;
        dataView.setUint32(index, this.value.entryName.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.value.entryName), index);
        index += this.value.entryName.length + 18;
        for (const property of outputArray) {
            output.set(property, index);
            index += property.byteLength;
        }

        return output;
    }

}

class GvasStruct extends GvasProperty {

    override value: Array<GvasProperty>;

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let index = startIndex;
        let properties = new Array<{length: number, property: GvasProperty}>();

        if (this.name || this.type) {
            let dataView = new DataView(buffer);
            const padding = 17;
            let structLength = dataView.getInt32(index, true);
            index += 4 + 4;
            let typeLength = dataView.getInt32(index, true);
            index += 4;
            let type = new TextDecoder().decode(buffer.slice(index, index + typeLength - 1));
            index += typeLength + padding;
            let rawValue = buffer.slice(index, index + structLength);
            for (let i = 0; i < structLength;) {
                let propertyContainer: {length: number, property: GvasProperty};
                if (type.endsWith('Property')) {
                    propertyContainer = deserializeProperty(rawValue, i);
                    propertyContainer.property.type = type;
                    properties.push(propertyContainer);
                } else {
                    let structClass = structClasses.get(type);
                    if (structClass == undefined) {
                        continue;
                    }
                    let property = new(structClass);
                    property.deserializeBody(rawValue,i);
                    let shortLength = property.deserializeBody(rawValue, i);
                    property.type = type;
                    propertyContainer = {
                        property: property,
                        length: shortLength + 12 + typeLength + padding
                    };
                    properties.push(propertyContainer);
                }
                if (!propertyContainer) {
                    propertyContainer = { property: new GvasUnknown(), length: 1 };
                    properties.push(propertyContainer);
                    break;
                }
                i += propertyContainer.length;
            }
        } else {
            let finished = false;
            while (!finished) {
                let propertyContainer = deserializeProperty(buffer, index);
                properties.push(propertyContainer);
                index += propertyContainer.length;
                finished = propertyContainer.property instanceof ShortNone;
            }
        }

        this.value = [];
        let output = 0
        for (const container of properties) {
            this.value.push(container.property);
            output += container.length;
        }
        return output;
    }

    override serializeBody() {
        let outputLength = 0;
        let outputArray = new Array<Uint8Array>();
        for (const property of this.value) {
            let array = property.name || property instanceof ShortNone ? serializeProperty(property) : property.serializeBody();
            outputLength += array.byteLength;
            outputArray.push(array);
        }

        let buffer = new ArrayBuffer(outputLength);
        let output = new Uint8Array(buffer);
        let index = 0;

        for (const property of outputArray) {
            output.set(property, index);
            index += property.byteLength;
        }

        return output;
    }

}

class StructSub extends GvasProperty {}

class ShortNone extends StructSub {

    constructor() {
        super();
        this.type = 'None';
    }

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        return 0;
    }

    override serializeBody() {
        return new Uint8Array(0);
    }

}

class Vector extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let dataView = new DataView(buffer);
        let x = dataView.getFloat32(index, true);
        index += 4;
        let y = dataView.getFloat32(index, true);
        index += 4;
        let z = dataView.getFloat32(index, true);
        this.value = { x: x, y: y, z: z };
        return 12;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = 4 + 4 + 4 + 7 + 17 + 4 + 4 + 4;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 12, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);
        index += 4;
        dataView.setFloat32(index, this.value.z, true);

        return output;
    }

}

class Vector2D extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let dataView = new DataView(buffer);
        let x = dataView.getFloat32(index, true);
        index += 4;
        let y = dataView.getFloat32(index, true);
        this.value = { x: x, y: y };
        return 8;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = 4 + 4 + 4 + 9 + 17 + 4 + 4;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 8, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        let typeName = textEncoder.encode(this.type);
        output.set(typeName, index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);

        return output;
    }

}

class Rotator extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let dataView = new DataView(buffer);
        let x = dataView.getFloat32(index, true);
        index += 4;
        let y = dataView.getFloat32(index, true);
        index += 4;
        let z = dataView.getFloat32(index, true);
        this.value = { x: x, y: y, z: z };
        return 12;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = 4 + 4 + 4 + this.type.length + 18 + 4 + 4 + 4;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 12, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);
        index += 4;
        dataView.setFloat32(index, this.value.z, true);

        return output;
    }

}

class Guid extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let dataView = new DataView(buffer);

        let a = dataView.getFloat32(index, true);
        index += 4;
        let b = dataView.getFloat32(index, true);
        index += 4;
        let c = dataView.getFloat32(index, true);
        index += 4;
        let d = dataView.getFloat32(index, true);
        this.value = { a: a, b: b, c: c, d: d };
        return 16;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = 4 + 4 + 4 + 7 + 17 + 4 + 4 + 4 + 2;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 16, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18
        dataView.setFloat32(index, this.value.a, true);
        index += 4;
        dataView.setFloat32(index, this.value.b, true);
        index += 4;
        dataView.setFloat32(index, this.value.c, true);
        index += 4;
        dataView.setFloat32(index, this.value.d, true);

        return output;
    }

}

class DateTime extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let rawDate = new DataView(buffer).getBigUint64(index, true);
        this.value = rawDate;
        return 8;
    }

    override serializeBody() {
        let newLength = 4 + 4 + 4 + 9 + 17 + 8;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 8, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(new TextEncoder().encode(this.type), index);
        index += this.type.length + 18;
        dataView.setBigUint64(index, this.value, true);

        return output;
    }

}

/** Made up of a Rotation (Quat), a Translation (Vector), and a Scale3D (Vector), all of which are StructProperties. */
class Transform extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, startIndex: number) {
        let index = startIndex;
        let rotation = deserializeProperty(buffer, index);
        index += rotation.length;
        let translation = deserializeProperty(buffer, index);
        index += translation.length;
        let scale = deserializeProperty(buffer, index);
        index += scale.length;
        this.value = {
            rotation: rotation.property,
            translation: translation.property,
            scale: scale.property
        };
        index += 9;
        return index - startIndex;
    }

    override serializeBody() {
        let rotation = serializeProperty(this.value.rotation);
        let translation = serializeProperty(this.value.translation);
        let scale = serializeProperty(this.value.scale);
        let none = serializeProperty(new ShortNone());
        let outputLength = rotation.byteLength + translation.byteLength + scale.byteLength + none.byteLength + this.type.length + 30;

        let textEncoder = new TextEncoder();
        let buffer = new ArrayBuffer(outputLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, rotation.byteLength + translation.byteLength + scale.byteLength + 9, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18;
        output.set(rotation, index);
        index += rotation.byteLength;
        output.set(translation, index);
        index += translation.byteLength;
        output.set(scale, index);
        index += scale.byteLength;
        output.set(none, index);

        return output;
    }

}

class Quat extends StructSub {

    override deserializeBody(buffer: ArrayBuffer, index: number) {
        let dataView = new DataView(buffer);

        let a = dataView.getFloat32(index, true);
        index += 4;
        let b = dataView.getFloat32(index, true);
        index += 4;
        let c = dataView.getFloat32(index, true);
        index += 4;
        let d = dataView.getFloat32(index, true);
        this.value = { a: a, b: b, c: c, d: d };
        return 16;
    }

    override serializeBody() {
        let textEncoder = new TextEncoder();
        let newLength = 4 + 4 + 4 + 5 + 17 + 4 + 4 + 4 + 4;
        let buffer = new ArrayBuffer(newLength);
        let dataView = new DataView(buffer);
        let output = new Uint8Array(buffer);

        let index = 0;
        dataView.setUint32(index, 16, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18
        dataView.setFloat32(index, this.value.a, true);
        index += 4;
        dataView.setFloat32(index, this.value.b, true);
        index += 4;
        dataView.setFloat32(index, this.value.c, true);
        index += 4;
        dataView.setFloat32(index, this.value.d, true);

        return output;
    }

}

class GvasSave {
    ue4Version = 'Unknown';
    saveType = 'Unknown';
    fileStart: ArrayBuffer;
    properties: Array<GvasProperty>;
}

var propertyClasses = new Map<string, typeof GvasProperty>([
    ['UnknownProperty', GvasUnknown],
    ['StrProperty', GvasString],
    ['BoolProperty', GvasBoolean],
    ['ByteProperty', GvasByte],
    ['IntProperty', GvasInteger],
    ['FloatProperty', GvasFloat],
    ['ObjectProperty', GvasString],
    ['ArrayProperty', GvasArray],
    ['StructProperty', GvasStruct],
    ['MapProperty', GvasMap],
    ['NameProperty', GvasString]
]);
var structClasses = new Map<string, typeof GvasProperty>([
    ['Vector', Vector],
    ['Vector2D', Vector2D],
    ['Rotator', Rotator],
    ['Guid', Guid],
    ['DateTime', DateTime],
    ['Quat', Quat],
    ['Transform', Transform]
]);

/** 
 * 
 * Converts a GvasSave object into a Uint8Array for saving to disk.
 * 
 * @param saveObject The object to be saved.
 * 
 * @returns A Uint8Array for saving to disk.
 * 
 */
function toGvas(saveObject: GvasSave): Uint8Array {
    let length = saveObject.fileStart.byteLength + saveObject.saveType.length + 5;
    let properties = new Array<Uint8Array>();
    for (const property of saveObject.properties) {
        let encoded = serializeProperty(property);
        properties.push(encoded);
        length += encoded.byteLength;
    }

    let buffer = new ArrayBuffer(length);
    let dataView = new DataView(buffer);
    let output = new Uint8Array(buffer);

    let index = 0;
    output.set(new Uint8Array(saveObject.fileStart), index);
    index += saveObject.fileStart.byteLength;
    dataView.setUint32(index, saveObject.saveType.length + 1, true);
    index += 4;
    output.set(new TextEncoder().encode(saveObject.saveType), index);
    index += saveObject.saveType.length + 1;
    for (const property of properties) {
        output.set(property, index);
        index += property.byteLength;
    }

    return output;
}

/** 
 * 
 * Synchronously reads the provided ArrayBuffer and returns a GvasSave object with file details.
 * 
 * @param {ArrayBuffer} buffer The save file contents as an ArrayBuffer.
 * 
 * @returns {GvasSave} A GvasSave object containing all the save file info.
 * 
 */
function fromGvas(buffer: ArrayBuffer): GvasSave {

    let saveObject = new GvasSave();

    // Validate GVAS format.
    const isGvas = buffer.byteLength >= 4 && new TextDecoder().decode(buffer.slice(0, 4)) == 'GVAS';
    if (!isGvas) {
        logErrors('File not correctly formatted as GVAS.');
        return saveObject;
    }

    // Parse UE4 version.
    saveObject.ue4Version = parseString(buffer, 22);

    // Find starting point for rest of data.
    let first = saveObject.ue4Version.length + 31;
    let currentIndex = (new DataView(buffer).getUint32(first, true) * 20) + first + 4;
    saveObject.fileStart = buffer.slice(0, currentIndex);

    // Parse save file type
    saveObject.saveType = parseString(buffer, currentIndex);
    currentIndex += saveObject.saveType.length + 5;

    // Parse properties.
    let i = 0;
    saveObject.properties = [];
    while (currentIndex < buffer.byteLength && i < 10000) {
        let propertyContainer = deserializeProperty(buffer, currentIndex);
        saveObject.properties.push(propertyContainer.property);
        currentIndex += propertyContainer ? propertyContainer.length : 0;
        i++;
    }

    return saveObject;
}

/** 
 * Use to parse strings from an ArrayBuffer.
 * 
 * @param buffer The ArrayBuffer.
 * 
 * @param offset Optional. If provided, the string is parsed starting at this position.
 * 
 * @returns The string contained in the buffer at index 0 or the provided offset.
 */
function parseString(buffer: ArrayBuffer, offset = 0): string {
    let stringlength = new DataView(buffer).getUint32(offset, true);
    return new TextDecoder().decode(buffer.slice(offset + 4, offset + stringlength + 3));
}

function deserializeProperty(buffer: ArrayBuffer, startIndex: number, named = true, typed = true): {length: number, property: GvasProperty} {
    let dataView = new DataView(buffer);
    let textDecoder = new TextDecoder();

    let index = startIndex;
    let name = '';
    if (named) {
        name = parseString(buffer, index);
        index += name.length + 5;
        if (name == 'None') {
            let none = dataView.getUint32(index, true) == 0 ? new LongNone() : new ShortNone();
            let shortLength = none.deserializeBody(buffer, index);
            return {
                property: none,
                length: shortLength + 9
            };
        }
    }
    let type = '';
    if (typed) {
        type = parseString(buffer, index);
        index += type.length + 5;
    }
    let propertyClass = propertyClasses.get(type);
    if (propertyClass == undefined) {
        logErrors(`Encountered unknown property with name '${name}' and type '${type}'`);
        return {length: 0, property: new GvasUnknown()};
    }
    let property = new(propertyClass)();
    if (named) {
        property.name = name;
    }
    if (typed) {
        property.type = type;
    }
    let shortLength = property.deserializeBody(buffer, index);
    return { property: property, length: index - startIndex + shortLength };
}

function serializeProperty(property: GvasProperty): Uint8Array {
    let headerLength = 0;
    if (property.name) {
        headerLength += property.name.length + 5;
    }
    if (property.type) {
        headerLength += property.type.length + 5;
    }

    let textEncoder = new TextEncoder();
    let buffer = new ArrayBuffer(headerLength);
    let dataView = new DataView(buffer);
    let header = new Uint8Array(buffer);
    let index = 0;

    if (property.name) {
        dataView.setUint32(index, property.name.length + 1, true);
        index += 4;
        header.set(textEncoder.encode(property.name), index);
        index += property.name.length + 1;
    }

    if (property.type) {
        dataView.setUint32(index, property.type.length + 1, true);
        index += 4;
        header.set(textEncoder.encode(property.type), index);
        index += property.type.length + 1;
    }

    let body = property.serializeBody();

    let combined = new Uint8Array(header.length + body.length);
    combined.set(header);
    combined.set(body, header.length);
    return combined;
}

function fetchNamedPropertyFromArray(name: string, array: Array<GvasProperty>): GvasProperty {
    for (const property of array) {
        if (property.name == name) {
            return property;
        }
    }
    return new GvasUnknown();
}

function fetchPropertyFromMap(key: GvasProperty, map: Map<GvasProperty, GvasProperty>): GvasProperty {
    let returnProperty = new GvasUnknown();
    let skip = false;
    map.forEach((entryValue, entryKey, mapRef)=>{
        if (skip) return;
        if (JSON.stringify(entryKey) == JSON.stringify(key)) {
            returnProperty = entryValue.value;
            skip = true;
        };
    });
    return returnProperty;
}

function logErrors(...args: string[]) {
        console.error(args);
}