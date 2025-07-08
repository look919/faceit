// Add BigInt serialization support for JSON
if (typeof BigInt !== 'undefined') {
  // @ts-expect-error: Adding toJSON to BigInt prototype
  BigInt.prototype.toJSON = function() {
    return this.toString();
  };
}
