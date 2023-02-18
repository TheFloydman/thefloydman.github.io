/**
 * GVAS Parser written by Floydman. Use at your own risk.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GvasProperty = /** @class */ (function () {
    function GvasProperty() {
    }
    /** Returns an int counting the number of bytes that were deserialized. */
    GvasProperty.prototype.deserializeBody = function (buffer, index) {
        return 0;
    };
    ;
    /** Returns a Uint8Array representation of this property's body. */
    GvasProperty.prototype.serializeBody = function () {
        return new Uint8Array(0);
    };
    return GvasProperty;
}());
var GvasUnknown = /** @class */ (function (_super) {
    __extends(GvasUnknown, _super);
    function GvasUnknown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GvasUnknown;
}(GvasProperty));
var LongNone = /** @class */ (function (_super) {
    __extends(LongNone, _super);
    function LongNone() {
        var _this = _super.call(this) || this;
        _this.type = 'None';
        return _this;
    }
    LongNone.prototype.deserializeBody = function (buffer, startIndex) {
        return 4;
    };
    LongNone.prototype.serializeBody = function () {
        var buffer = new ArrayBuffer(4);
        var output = new Uint8Array(buffer);
        return output;
    };
    return LongNone;
}(GvasProperty));
var GvasString = /** @class */ (function (_super) {
    __extends(GvasString, _super);
    function GvasString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasString.prototype.deserializeBody = function (buffer, startIndex) {
        var dataView = new DataView(buffer);
        var index = startIndex;
        if (this.name || this.type) {
            var extendedValueLength = dataView.getInt32(index, true);
            index += 9;
        }
        var valueLength = dataView.getInt32(index, true);
        this.value = parseString(buffer, index);
        index += valueLength + 4;
        return index - startIndex;
    };
    GvasString.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var outputLength = 4 + (this.value.length > 0 ? this.value.length + 1 : 0);
        if (this.name || this.type) {
            outputLength += 9;
        }
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        if (this.name || this.type) {
            var longValueLength = this.value.length > 0 ? this.value.length + 5 : 4;
            dataView.setUint32(index, longValueLength, true);
            index += 9;
        }
        var shortValueLength = this.value.length > 0 ? this.value.length + 1 : 0;
        dataView.setUint32(index, shortValueLength, true);
        if (shortValueLength > 0) {
            index += 4;
            output.set(textEncoder.encode(this.value), index);
        }
        return output;
    };
    return GvasString;
}(GvasProperty));
var GvasBoolean = /** @class */ (function (_super) {
    __extends(GvasBoolean, _super);
    function GvasBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasBoolean.prototype.deserializeBody = function (buffer, startIndex) {
        var padding = 8;
        var index = startIndex;
        index += padding;
        this.value = new DataView(buffer).getInt8(index) == 0 ? false : true;
        index += 2;
        return index - startIndex;
    };
    GvasBoolean.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var outputLength = 10;
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        dataView.setUint8(8, this.value ? 1 : 0);
        return output;
    };
    return GvasBoolean;
}(GvasProperty));
var GvasByte = /** @class */ (function (_super) {
    __extends(GvasByte, _super);
    function GvasByte() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasByte.prototype.deserializeBody = function (buffer, startIndex) {
        var padding = 4;
        var index = startIndex;
        var longValueLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4 + padding;
        var descriptorLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4;
        var descriptor = new TextDecoder().decode(buffer.slice(index, index + descriptorLength - 1));
        index += descriptorLength + 1;
        var valueLength = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 4;
        this.value = {
            descriptor: descriptor,
            details: new TextDecoder().decode(buffer.slice(index, index + valueLength - 1))
        };
        index += valueLength;
        return index - startIndex;
    };
    GvasByte.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var outputLength = this.value.descriptor.length + this.value.details.length + 19;
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        var longValueLength = 4 + this.value.details.length + 1;
        dataView.setUint32(index, longValueLength, true);
        index += 8;
        var descriptorLength = this.value.descriptor.length + 1;
        dataView.setUint32(index, descriptorLength, true);
        index += 4;
        var descriptor = textEncoder.encode(this.value.descriptor);
        output.set(descriptor, index);
        index += this.value.descriptor.length + 2;
        dataView.setUint32(index, this.value.details.length + 1, true);
        index += 4;
        var details = textEncoder.encode(this.value.details);
        output.set(details, index);
        return output;
    };
    return GvasByte;
}(GvasProperty));
var GvasInteger = /** @class */ (function (_super) {
    __extends(GvasInteger, _super);
    function GvasInteger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasInteger.prototype.deserializeBody = function (buffer, startIndex) {
        var dataView = new DataView(buffer);
        var index = startIndex;
        var numberOfBytes = dataView.getUint32(index, true);
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
    };
    GvasInteger.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var outputLength = this.value.bytes + 9;
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
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
    };
    return GvasInteger;
}(GvasProperty));
var GvasFloat = /** @class */ (function (_super) {
    __extends(GvasFloat, _super);
    function GvasFloat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasFloat.prototype.deserializeBody = function (buffer, startIndex) {
        var index = startIndex;
        var numberOfBytes = new DataView(buffer.slice(index, index + 4)).getUint32(0, true);
        index += 9;
        var dataView = new DataView(buffer.slice(index, index + numberOfBytes));
        index += numberOfBytes;
        this.value = { bytes: numberOfBytes, float: numberOfBytes == 4 ? dataView.getFloat32(0, true) : dataView.getFloat64(0, true) };
        return index - startIndex;
    };
    GvasFloat.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = this.value.bytes + 9;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, this.value.bytes, true);
        index += 9;
        if (this.value.bytes == 4) {
            dataView.setFloat32(index, this.value.float, true);
        }
        else {
            dataView.setFloat64(index, this.value.float, true);
        }
        return output;
    };
    return GvasFloat;
}(GvasProperty));
var GvasMap = /** @class */ (function (_super) {
    __extends(GvasMap, _super);
    function GvasMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasMap.prototype.deserializeBody = function (buffer, startIndex) {
        var dataView = new DataView(buffer);
        var textDecoder = new TextDecoder();
        var index = startIndex;
        var firstValue = dataView.getBigUint64(index, true); // Length from end of valueType (including trailing 0 byte) + 1 to end of map.
        index += 8;
        var keyTypeLength = dataView.getUint32(index, true);
        index += 4;
        var keyType = textDecoder.decode(buffer.slice(index, index + keyTypeLength - 1));
        index += keyTypeLength;
        var valueTypeLength = dataView.getUint32(index, true);
        index += 4;
        var valueType = textDecoder.decode(buffer.slice(index, index + valueTypeLength - 1));
        index += valueTypeLength + 5;
        var numberOfEntries = dataView.getUint32(index, true);
        index += 4;
        var map = new Map();
        for (var i = 0; i < numberOfEntries; i++) {
            var keyClass = propertyClasses.get(keyType);
            var valueClass = propertyClasses.get(valueType);
            if (keyClass == undefined || valueClass == undefined) {
                continue;
            }
            var entryKey = new (keyClass)();
            index += entryKey.deserializeBody(buffer, index);
            var entryValue = new (valueClass)();
            index += entryValue.deserializeBody(buffer, index);
            map.set(entryKey, entryValue);
        }
        this.value = {
            key: keyType,
            value: valueType,
            entries: map
        };
        return index - startIndex;
    };
    GvasMap.prototype.serializeBody = function () {
        //35 too many
        var outputLength = this.name.length + this.type.length + this.value.key.length + this.value.value.length + 37;
        var outputArray = new Array();
        this.value.entries.forEach(function (value, key, map) {
            var encodedKey = serializeProperty(key);
            var encodedValue = serializeProperty(value);
            outputLength += encodedKey.byteLength + encodedValue.byteLength;
            outputArray.push([encodedKey, encodedValue]);
        });
        var textEncoder = new TextEncoder();
        var buffer = new ArrayBuffer(outputLength - this.name.length - this.type.length - 10);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        var bigFirstNumber = outputLength - this.name.length - this.type.length - this.value.key.length - this.value.value.length - 29;
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
        for (var _i = 0, outputArray_1 = outputArray; _i < outputArray_1.length; _i++) {
            var pair = outputArray_1[_i];
            output.set(pair[0], index);
            index += pair[0].byteLength;
            output.set(pair[1], index);
            index += pair[1].byteLength;
        }
        return output;
    };
    return GvasMap;
}(GvasProperty));
var GvasArray = /** @class */ (function (_super) {
    __extends(GvasArray, _super);
    function GvasArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasArray.prototype.deserializeBody = function (buffer, startIndex) {
        var dataView = new DataView(buffer);
        var textDecoder = new TextDecoder();
        var index = startIndex;
        var totalArrayBytesQuantity = dataView.getUint32(index, true); // From declaration of number of entries to end.
        index += 8;
        var type1Length = dataView.getUint32(index, true);
        index += 4;
        var type1 = textDecoder.decode(buffer.slice(index, index + type1Length - 1));
        index += type1Length + 1;
        var numberOfEntries = dataView.getUint32(index, true);
        index += 4;
        var nameAgainLength = dataView.getUint32(index, true);
        index += 4;
        var nameAgain = textDecoder.decode(buffer.slice(index, index + nameAgainLength - 1));
        index += nameAgainLength;
        var type2Length = dataView.getUint32(index, true);
        index += 4;
        var type2 = textDecoder.decode(buffer.slice(index, index + type2Length - 1));
        index += type2Length;
        var totalEntriesBytesQuantity = dataView.getUint32(index, true);
        index += 4 + 4;
        var entryNameLength = dataView.getUint32(index, true);
        index += 4;
        var entryName = textDecoder.decode(buffer.slice(index, index + entryNameLength - 1));
        index += entryNameLength + 17;
        var output = index - startIndex;
        var properties = new Array();
        for (var i = 0; i < numberOfEntries; i++) {
            var propertyClass = propertyClasses.get(type1);
            if (propertyClass == undefined) {
                continue;
            }
            var property = new (propertyClass)();
            var shortLength = property.deserializeBody(buffer, index);
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
    };
    GvasArray.prototype.serializeBody = function () {
        var outputLength = this.name.length + this.type.length + this.value.type.length + this.value.entryName.length + 59;
        var outputArray = new Array();
        var propertiesLength = 0;
        for (var _i = 0, _a = this.value.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            var array = serializeProperty(property);
            propertiesLength += array.byteLength;
            outputArray.push(array);
        }
        outputLength += propertiesLength;
        var textEncoder = new TextEncoder();
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, outputLength - this.value.type.length - 14, true);
        index += 8;
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
        for (var _b = 0, outputArray_2 = outputArray; _b < outputArray_2.length; _b++) {
            var property = outputArray_2[_b];
            output.set(property, index);
            index += property.byteLength;
        }
        return output;
    };
    return GvasArray;
}(GvasProperty));
var GvasStruct = /** @class */ (function (_super) {
    __extends(GvasStruct, _super);
    function GvasStruct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GvasStruct.prototype.deserializeBody = function (buffer, startIndex) {
        var index = startIndex;
        var properties = new Array();
        if (this.name || this.type) {
            var dataView = new DataView(buffer);
            var padding = 17;
            var structLength = dataView.getInt32(index, true);
            index += 4 + 4;
            var typeLength = dataView.getInt32(index, true);
            index += 4;
            var type = new TextDecoder().decode(buffer.slice(index, index + typeLength - 1));
            index += typeLength + padding;
            var rawValue = buffer.slice(index, index + structLength);
            for (var i = 0; i < structLength;) {
                var propertyContainer = void 0;
                if (type.endsWith('Property')) {
                    propertyContainer = deserializeProperty(rawValue, i);
                    propertyContainer.property.type = type;
                    properties.push(propertyContainer);
                }
                else {
                    var structClass = structClasses.get(type);
                    if (structClass == undefined) {
                        continue;
                    }
                    var property = new (structClass);
                    property.deserializeBody(rawValue, i);
                    var shortLength = property.deserializeBody(rawValue, i);
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
        }
        else {
            var finished = false;
            while (!finished) {
                var propertyContainer = deserializeProperty(buffer, index);
                properties.push(propertyContainer);
                index += propertyContainer.length;
                finished = propertyContainer.property instanceof ShortNone;
            }
        }
        this.value = [];
        var output = 0;
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var container = properties_1[_i];
            this.value.push(container.property);
            output += container.length;
        }
        return output;
    };
    GvasStruct.prototype.serializeBody = function () {
        var outputLength = 0;
        var outputArray = new Array();
        for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
            var property = _a[_i];
            var array = property.name || property instanceof ShortNone ? serializeProperty(property) : property.serializeBody();
            outputLength += array.byteLength;
            outputArray.push(array);
        }
        var buffer = new ArrayBuffer(outputLength);
        var output = new Uint8Array(buffer);
        var index = 0;
        for (var _b = 0, outputArray_3 = outputArray; _b < outputArray_3.length; _b++) {
            var property = outputArray_3[_b];
            output.set(property, index);
            index += property.byteLength;
        }
        return output;
    };
    return GvasStruct;
}(GvasProperty));
var StructSub = /** @class */ (function (_super) {
    __extends(StructSub, _super);
    function StructSub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StructSub;
}(GvasProperty));
var ShortNone = /** @class */ (function (_super) {
    __extends(ShortNone, _super);
    function ShortNone() {
        var _this = _super.call(this) || this;
        _this.type = 'None';
        return _this;
    }
    ShortNone.prototype.deserializeBody = function (buffer, index) {
        return 0;
    };
    ShortNone.prototype.serializeBody = function () {
        return new Uint8Array(0);
    };
    return ShortNone;
}(StructSub));
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vector.prototype.deserializeBody = function (buffer, index) {
        var dataView = new DataView(buffer);
        var x = dataView.getFloat32(index, true);
        index += 4;
        var y = dataView.getFloat32(index, true);
        index += 4;
        var z = dataView.getFloat32(index, true);
        this.value = { x: x, y: y, z: z };
        return 12;
    };
    Vector.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = 4 + 4 + 4 + 7 + 17 + 4 + 4 + 4;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 12, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);
        index += 4;
        dataView.setFloat32(index, this.value.z, true);
        return output;
    };
    return Vector;
}(StructSub));
var Vector2D = /** @class */ (function (_super) {
    __extends(Vector2D, _super);
    function Vector2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vector2D.prototype.deserializeBody = function (buffer, index) {
        var dataView = new DataView(buffer);
        var x = dataView.getFloat32(index, true);
        index += 4;
        var y = dataView.getFloat32(index, true);
        this.value = { x: x, y: y };
        return 8;
    };
    Vector2D.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = 4 + 4 + 4 + 9 + 17 + 4 + 4;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 8, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        var typeName = textEncoder.encode(this.type);
        output.set(typeName, index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);
        return output;
    };
    return Vector2D;
}(StructSub));
var Rotator = /** @class */ (function (_super) {
    __extends(Rotator, _super);
    function Rotator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rotator.prototype.deserializeBody = function (buffer, index) {
        var dataView = new DataView(buffer);
        var x = dataView.getFloat32(index, true);
        index += 4;
        var y = dataView.getFloat32(index, true);
        index += 4;
        var z = dataView.getFloat32(index, true);
        this.value = { x: x, y: y, z: z };
        return 12;
    };
    Rotator.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = 4 + 4 + 4 + this.type.length + 18 + 4 + 4 + 4;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 12, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.x, true);
        index += 4;
        dataView.setFloat32(index, this.value.y, true);
        index += 4;
        dataView.setFloat32(index, this.value.z, true);
        return output;
    };
    return Rotator;
}(StructSub));
var Guid = /** @class */ (function (_super) {
    __extends(Guid, _super);
    function Guid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Guid.prototype.deserializeBody = function (buffer, index) {
        var dataView = new DataView(buffer);
        var a = dataView.getFloat32(index, true);
        index += 4;
        var b = dataView.getFloat32(index, true);
        index += 4;
        var c = dataView.getFloat32(index, true);
        index += 4;
        var d = dataView.getFloat32(index, true);
        this.value = { a: a, b: b, c: c, d: d };
        return 16;
    };
    Guid.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = 4 + 4 + 4 + 7 + 17 + 4 + 4 + 4 + 2;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 16, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.a, true);
        index += 4;
        dataView.setFloat32(index, this.value.b, true);
        index += 4;
        dataView.setFloat32(index, this.value.c, true);
        index += 4;
        dataView.setFloat32(index, this.value.d, true);
        return output;
    };
    return Guid;
}(StructSub));
var DateTime = /** @class */ (function (_super) {
    __extends(DateTime, _super);
    function DateTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTime.prototype.deserializeBody = function (buffer, index) {
        var rawDate = new DataView(buffer).getBigUint64(index, true);
        this.value = rawDate;
        return 8;
    };
    DateTime.prototype.serializeBody = function () {
        var newLength = 4 + 4 + 4 + 9 + 17 + 8;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 8, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(new TextEncoder().encode(this.type), index);
        index += this.type.length + 18;
        dataView.setBigUint64(index, this.value, true);
        return output;
    };
    return DateTime;
}(StructSub));
/** Made up of a Rotation (Quat), a Translation (Vector), and a Scale3D (Vector), all of which are StructProperties. */
var Transform = /** @class */ (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype.deserializeBody = function (buffer, startIndex) {
        var index = startIndex;
        var rotation = deserializeProperty(buffer, index);
        index += rotation.length;
        var translation = deserializeProperty(buffer, index);
        index += translation.length;
        var scale = deserializeProperty(buffer, index);
        index += scale.length;
        this.value = {
            rotation: rotation.property,
            translation: translation.property,
            scale: scale.property
        };
        index += 9;
        return index - startIndex;
    };
    Transform.prototype.serializeBody = function () {
        var rotation = serializeProperty(this.value.rotation);
        var translation = serializeProperty(this.value.translation);
        var scale = serializeProperty(this.value.scale);
        var none = serializeProperty(new ShortNone());
        var outputLength = rotation.byteLength + translation.byteLength + scale.byteLength + none.byteLength + this.type.length + 30;
        var textEncoder = new TextEncoder();
        var buffer = new ArrayBuffer(outputLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
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
    };
    return Transform;
}(StructSub));
var Quat = /** @class */ (function (_super) {
    __extends(Quat, _super);
    function Quat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quat.prototype.deserializeBody = function (buffer, index) {
        var dataView = new DataView(buffer);
        var a = dataView.getFloat32(index, true);
        index += 4;
        var b = dataView.getFloat32(index, true);
        index += 4;
        var c = dataView.getFloat32(index, true);
        index += 4;
        var d = dataView.getFloat32(index, true);
        this.value = { a: a, b: b, c: c, d: d };
        return 16;
    };
    Quat.prototype.serializeBody = function () {
        var textEncoder = new TextEncoder();
        var newLength = 4 + 4 + 4 + 5 + 17 + 4 + 4 + 4 + 4;
        var buffer = new ArrayBuffer(newLength);
        var dataView = new DataView(buffer);
        var output = new Uint8Array(buffer);
        var index = 0;
        dataView.setUint32(index, 16, true);
        index += 8;
        dataView.setUint32(index, this.type.length + 1, true);
        index += 4;
        output.set(textEncoder.encode(this.type), index);
        index += this.type.length + 18;
        dataView.setFloat32(index, this.value.a, true);
        index += 4;
        dataView.setFloat32(index, this.value.b, true);
        index += 4;
        dataView.setFloat32(index, this.value.c, true);
        index += 4;
        dataView.setFloat32(index, this.value.d, true);
        return output;
    };
    return Quat;
}(StructSub));
var GvasSave = /** @class */ (function () {
    function GvasSave() {
        this.ue4Version = 'Unknown';
        this.saveType = 'Unknown';
    }
    return GvasSave;
}());
var propertyClasses = new Map([
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
var structClasses = new Map([
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
function toGvas(saveObject) {
    var length = saveObject.fileStart.byteLength + saveObject.saveType.length + 5;
    var properties = new Array();
    for (var _i = 0, _a = saveObject.properties; _i < _a.length; _i++) {
        var property = _a[_i];
        var encoded = serializeProperty(property);
        properties.push(encoded);
        length += encoded.byteLength;
    }
    var buffer = new ArrayBuffer(length);
    var dataView = new DataView(buffer);
    var output = new Uint8Array(buffer);
    var index = 0;
    output.set(new Uint8Array(saveObject.fileStart), index);
    index += saveObject.fileStart.byteLength;
    dataView.setUint32(index, saveObject.saveType.length + 1, true);
    index += 4;
    output.set(new TextEncoder().encode(saveObject.saveType), index);
    index += saveObject.saveType.length + 1;
    for (var _b = 0, properties_2 = properties; _b < properties_2.length; _b++) {
        var property = properties_2[_b];
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
function fromGvas(buffer) {
    var saveObject = new GvasSave();
    // Validate GVAS format.
    var isGvas = buffer.byteLength >= 4 && new TextDecoder().decode(buffer.slice(0, 4)) == 'GVAS';
    if (!isGvas) {
        logErrors('File not correctly formatted as GVAS.');
        return saveObject;
    }
    // Parse UE4 version.
    saveObject.ue4Version = parseString(buffer, 22);
    // Find starting point for rest of data.
    var first = saveObject.ue4Version.length + 31;
    var currentIndex = (new DataView(buffer).getUint32(first, true) * 20) + first + 4;
    saveObject.fileStart = buffer.slice(0, currentIndex);
    // Parse save file type
    saveObject.saveType = parseString(buffer, currentIndex);
    currentIndex += saveObject.saveType.length + 5;
    // Parse properties.
    var i = 0;
    saveObject.properties = [];
    while (currentIndex < buffer.byteLength && i < 10000) {
        var propertyContainer = deserializeProperty(buffer, currentIndex);
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
function parseString(buffer, offset) {
    if (offset === void 0) { offset = 0; }
    var stringlength = new DataView(buffer).getUint32(offset, true);
    return new TextDecoder().decode(buffer.slice(offset + 4, offset + stringlength + 3));
}
function deserializeProperty(buffer, startIndex, named, typed) {
    if (named === void 0) { named = true; }
    if (typed === void 0) { typed = true; }
    var dataView = new DataView(buffer);
    var textDecoder = new TextDecoder();
    var index = startIndex;
    var name = '';
    if (named) {
        name = parseString(buffer, index);
        index += name.length + 5;
        if (name == 'None') {
            var none = dataView.getUint32(index, true) == 0 ? new LongNone() : new ShortNone();
            var shortLength_1 = none.deserializeBody(buffer, index);
            return {
                property: none,
                length: shortLength_1 + 9
            };
        }
    }
    var type = '';
    if (typed) {
        type = parseString(buffer, index);
        index += type.length + 5;
    }
    var propertyClass = propertyClasses.get(type);
    if (propertyClass == undefined) {
        logErrors("Encountered unknown property with name '".concat(name, "' and type '").concat(type, "'"));
        return { length: 0, property: new GvasUnknown() };
    }
    var property = new (propertyClass)();
    if (named) {
        property.name = name;
    }
    if (typed) {
        property.type = type;
    }
    var shortLength = property.deserializeBody(buffer, index);
    return { property: property, length: index - startIndex + shortLength };
}
function serializeProperty(property) {
    var headerLength = 0;
    if (property.name) {
        headerLength += property.name.length + 5;
    }
    if (property.type) {
        headerLength += property.type.length + 5;
    }
    var textEncoder = new TextEncoder();
    var buffer = new ArrayBuffer(headerLength);
    var dataView = new DataView(buffer);
    var header = new Uint8Array(buffer);
    var index = 0;
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
    var body = property.serializeBody();
    var combined = new Uint8Array(header.length + body.length);
    combined.set(header);
    combined.set(body, header.length);
    return combined;
}
function fetchNamedPropertyFromArray(name, array) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var property = array_1[_i];
        if (property.name == name) {
            return property;
        }
    }
    return new GvasUnknown();
}
function fetchPropertyFromMap(key, map) {
    var returnProperty = new GvasUnknown();
    var skip = false;
    map.forEach(function (entryValue, entryKey, mapRef) {
        if (skip)
            return;
        if (JSON.stringify(entryKey) == JSON.stringify(key)) {
            returnProperty = entryValue.value;
            skip = true;
        }
        ;
    });
    return returnProperty;
}
function logErrors() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.error(args);
}
