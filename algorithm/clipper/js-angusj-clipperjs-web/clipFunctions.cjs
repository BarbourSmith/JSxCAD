"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clipper_1 = require("./Clipper.cjs");
var ClipperError_1 = require("./ClipperError.cjs");
var enums_1 = require("./enums.cjs");
var devMode = typeof "process" !== "undefined" && process.env && process.env.NODE_ENV !== "production";
var addPathOrPaths = function (clipper, inputDatas, polyType) {
    if (inputDatas === undefined) {
        return;
    }
    // add each input
    for (var i = 0, maxi = inputDatas.length; i < maxi; i++) {
        var inputData = inputDatas[i];
        // add the path/paths
        var pathOrPaths = inputData.data;
        if (!pathOrPaths || pathOrPaths.length <= 0) {
            continue;
        }
        var closed_1 = inputData.closed === undefined ? true : inputData.closed;
        // is it a path or paths?
        if (Array.isArray(pathOrPaths[0])) {
            // paths
            if (!clipper.addPaths(pathOrPaths, polyType, closed_1)) {
                throw new ClipperError_1.ClipperError("invalid paths");
            }
        }
        else {
            // path
            if (!clipper.addPath(pathOrPaths, polyType, closed_1)) {
                throw new ClipperError_1.ClipperError(`invalid path: ${JSON.stringify(pathOrPaths)}`);
            }
        }
    }
};
function clipToPathsOrPolyTree(polyTreeMode, nativeClipperLib, params) {
    if (devMode) {
        if (!polyTreeMode && params.subjectInputs && params.subjectInputs.some(function (si) { return !si.closed; })) {
            throw new Error("clip to a PolyTree (not to a Path) when using open paths");
        }
    }
    var clipper = new Clipper_1.Clipper(nativeClipperLib, params);
    //noinspection UnusedCatchParameterJS
    try {
        addPathOrPaths(clipper, params.subjectInputs, enums_1.PolyType.Subject);
        addPathOrPaths(clipper, params.clipInputs, enums_1.PolyType.Clip);
        var result = void 0;
        var clipFillType = params.clipFillType === undefined ? params.subjectFillType : params.clipFillType;
        if (!polyTreeMode) {
            result = clipper.executeToPaths(params.clipType, params.subjectFillType, clipFillType, params.cleanDistance);
        }
        else {
            if (params.cleanDistance !== undefined) {
                throw new ClipperError_1.ClipperError("cleaning is not available for poly tree results");
            }
            result = clipper.executeToPolyTee(params.clipType, params.subjectFillType, clipFillType);
        }
        if (result === undefined) {
            throw new ClipperError_1.ClipperError("error while performing clipping task");
        }
        return result;
    }
    finally {
        clipper.dispose();
    }
}
exports.clipToPathsOrPolyTree = clipToPathsOrPolyTree;
function clipToPaths(nativeClipperLib, params) {
    return clipToPathsOrPolyTree(false, nativeClipperLib, params);
}
exports.clipToPaths = clipToPaths;
function clipToPolyTree(nativeClipperLib, params) {
    return clipToPathsOrPolyTree(true, nativeClipperLib, params);
}
exports.clipToPolyTree = clipToPolyTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcEZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGlwRnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQW9DO0FBQ3BDLCtDQUE4QztBQUM5QyxpQ0FBMkQ7QUFNM0QsSUFBTSxPQUFPLEdBQ1gsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDO0FBOEgzRixJQUFNLGNBQWMsR0FBRyxVQUNyQixPQUFnQixFQUNoQixVQUFvRCxFQUNwRCxRQUFrQjtJQUVsQixJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDNUIsT0FBTztLQUNSO0lBRUQsaUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhDLHFCQUFxQjtRQUNyQixJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDM0MsU0FBUztTQUNWO1FBRUQsSUFBTSxRQUFNLEdBQ1QsU0FBMEIsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLFNBQTBCLENBQUMsTUFBTSxDQUFDO1FBRS9GLHlCQUF5QjtRQUN6QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakMsUUFBUTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQW9CLEVBQUUsUUFBUSxFQUFFLFFBQU0sQ0FBQyxFQUFFO2dCQUM3RCxNQUFNLElBQUksMkJBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN6QztTQUNGO2FBQU07WUFDTCxPQUFPO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBbUIsRUFBRSxRQUFRLEVBQUUsUUFBTSxDQUFDLEVBQUU7Z0JBQzNELE1BQU0sSUFBSSwyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVGLFNBQWdCLHFCQUFxQixDQUNuQyxZQUFxQixFQUNyQixnQkFBMEMsRUFDMUMsTUFBa0I7SUFFbEIsSUFBSSxPQUFPLEVBQUU7UUFDWCxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQVYsQ0FBVSxDQUFDLEVBQUU7WUFDMUYsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzdFO0tBQ0Y7SUFFRCxJQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFdEQscUNBQXFDO0lBQ3JDLElBQUk7UUFDRixjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLE1BQU0sU0FBQSxDQUFDO1FBQ1gsSUFBTSxZQUFZLEdBQ2hCLE1BQU0sQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25GLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQzdCLE1BQU0sQ0FBQyxRQUFRLEVBQ2YsTUFBTSxDQUFDLGVBQWUsRUFDdEIsWUFBWSxFQUNaLE1BQU0sQ0FBQyxhQUFhLENBQ3JCLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDdEMsTUFBTSxJQUFJLDJCQUFZLENBQUMsaURBQWlELENBQUMsQ0FBQzthQUMzRTtZQUNELE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzFGO1FBQ0QsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSwyQkFBWSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7U0FDaEU7UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNmO1lBQVM7UUFDUixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBeENELHNEQXdDQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxnQkFBMEMsRUFBRSxNQUFrQjtJQUN4RixPQUFPLHFCQUFxQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQVUsQ0FBQztBQUN6RSxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixjQUFjLENBQzVCLGdCQUEwQyxFQUMxQyxNQUFrQjtJQUVsQixPQUFPLHFCQUFxQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQWEsQ0FBQztBQUMzRSxDQUFDO0FBTEQsd0NBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGlwcGVyIH0gZnJvbSBcIi4vQ2xpcHBlclwiO1xyXG5pbXBvcnQgeyBDbGlwcGVyRXJyb3IgfSBmcm9tIFwiLi9DbGlwcGVyRXJyb3JcIjtcclxuaW1wb3J0IHsgQ2xpcFR5cGUsIFBvbHlGaWxsVHlwZSwgUG9seVR5cGUgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVDbGlwcGVyTGliSW5zdGFuY2UgfSBmcm9tIFwiLi9uYXRpdmUvTmF0aXZlQ2xpcHBlckxpYkluc3RhbmNlXCI7XHJcbmltcG9ydCB7IFBhdGgsIFJlYWRvbmx5UGF0aCB9IGZyb20gXCIuL1BhdGhcIjtcclxuaW1wb3J0IHsgUGF0aHMsIFJlYWRvbmx5UGF0aHMgfSBmcm9tIFwiLi9QYXRoc1wiO1xyXG5pbXBvcnQgeyBQb2x5VHJlZSB9IGZyb20gXCIuL1BvbHlUcmVlXCI7XHJcblxyXG5jb25zdCBkZXZNb2RlID1cclxuICB0eXBlb2YgXCJwcm9jZXNzXCIgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIEEgc2luZ2xlIHN1YmplY3QgaW5wdXQgKG9mIG11bHRpcGxlIHBvc3NpYmxlIGlucHV0cykgZm9yIHRoZSBjbGlwVG9QYXRocyAvIGNsaXBUb1BvbHlUcmVlIG9wZXJhdGlvbnNcclxuICpcclxuICogJ1N1YmplY3QnIHBhdGhzIG1heSBiZSBlaXRoZXIgb3BlbiAobGluZXMpIG9yIGNsb3NlZCAocG9seWdvbnMpIG9yIGV2ZW4gYSBtaXh0dXJlIG9mIGJvdGguXHJcbiAqIFdpdGggY2xvc2VkIHBhdGhzLCBvcmllbnRhdGlvbiBzaG91bGQgY29uZm9ybSB3aXRoIHRoZSBmaWxsaW5nIHJ1bGUgdGhhdCB3aWxsIGJlIHBhc3NlZCB2aWEgQ2xpcHBlcidzIGV4ZWN1dGUgbWV0aG9kLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTdWJqZWN0SW5wdXQge1xyXG4gIC8qKlxyXG4gICAqIFBhdGggLyBQYXRocyBkYXRhLlxyXG4gICAqXHJcbiAgICogUGF0aCBDb29yZGluYXRlIHJhbmdlOlxyXG4gICAqIFBhdGggY29vcmRpbmF0ZXMgbXVzdCBiZSBiZXR3ZWVuIMKxIDkwMDcxOTkyNTQ3NDA5OTEsIG90aGVyd2lzZSBhIHJhbmdlIGVycm9yIHdpbGwgYmUgdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBhZGQgdGhlIHBhdGggdG8gdGhlIENsaXBwZXIgb2JqZWN0LlxyXG4gICAqIElmIGNvb3JkaW5hdGVzIGNhbiBiZSBrZXB0IGJldHdlZW4gwrEgMHgzRkZGRkZGRiAowrEgMS4wZSs5KSwgYSBtb2Rlc3QgaW5jcmVhc2UgaW4gcGVyZm9ybWFuY2UgKGFwcHJveC4gMTUtMjAlKSBvdmVyIHRoZSBsYXJnZXIgcmFuZ2UgY2FuIGJlIGFjaGlldmVkIGJ5XHJcbiAgICogYXZvaWRpbmcgbGFyZ2UgaW50ZWdlciBtYXRoLlxyXG4gICAqXHJcbiAgICogVGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBwYXRoIGlzIGludmFsaWQgZm9yIGNsaXBwaW5nLiBBIHBhdGggaXMgaW52YWxpZCBmb3IgY2xpcHBpbmcgd2hlbjpcclxuICAgKiAtIGl0IGhhcyBsZXNzIHRoYW4gMiB2ZXJ0aWNlc1xyXG4gICAqIC0gaXQgaGFzIDIgdmVydGljZXMgYnV0IGlzIG5vdCBhbiBvcGVuIHBhdGhcclxuICAgKiAtIHRoZSB2ZXJ0aWNlcyBhcmUgYWxsIGNvLWxpbmVhciBhbmQgaXQgaXMgbm90IGFuIG9wZW4gcGF0aFxyXG4gICAqL1xyXG4gIGRhdGE6IFJlYWRvbmx5UGF0aCB8IFJlYWRvbmx5UGF0aHM7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSBwYXRoL3BhdGhzIGlzIGNsb3NlZCBvciBub3QuXHJcbiAgICovXHJcbiAgY2xvc2VkOiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQSBzaW5nbGUgY2xpcCBpbnB1dCAob2YgbXVsdGlwbGUgcG9zc2libGUgaW5wdXRzKSBmb3IgdGhlIGNsaXBUb1BhdGhzIC8gY2xpcFRvUG9seVRyZWUgb3BlcmF0aW9ucy5cclxuICpcclxuICogQ2xpcHBpbmcgcGF0aHMgbXVzdCBhbHdheXMgYmUgY2xvc2VkLiBDbGlwcGVyIGFsbG93cyBwb2x5Z29ucyB0byBjbGlwIGJvdGggbGluZXMgYW5kIG90aGVyIHBvbHlnb25zLCBidXQgZG9lc24ndCBhbGxvdyBsaW5lcyB0byBjbGlwIGVpdGhlciBsaW5lcyBvciBwb2x5Z29ucy5cclxuICogV2l0aCBjbG9zZWQgcGF0aHMsIG9yaWVudGF0aW9uIHNob3VsZCBjb25mb3JtIHdpdGggdGhlIGZpbGxpbmcgcnVsZSB0aGF0IHdpbGwgYmUgcGFzc2VkIHZpYSBDbGlwcGVyJ3MgZXhlY3V0ZSBtZXRob2QuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENsaXBJbnB1dCB7XHJcbiAgLyoqXHJcbiAgICogUGF0aCAvIFBhdGhzIGRhdGEuXHJcbiAgICpcclxuICAgKiBQYXRoIENvb3JkaW5hdGUgcmFuZ2U6XHJcbiAgICogUGF0aCBjb29yZGluYXRlcyBtdXN0IGJlIGJldHdlZW4gwrEgOTAwNzE5OTI1NDc0MDk5MSwgb3RoZXJ3aXNlIGEgcmFuZ2UgZXJyb3Igd2lsbCBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGFkZCB0aGUgcGF0aCB0byB0aGUgQ2xpcHBlciBvYmplY3QuXHJcbiAgICogSWYgY29vcmRpbmF0ZXMgY2FuIGJlIGtlcHQgYmV0d2VlbiDCsSAweDNGRkZGRkZGICjCsSAxLjBlKzkpLCBhIG1vZGVzdCBpbmNyZWFzZSBpbiBwZXJmb3JtYW5jZSAoYXBwcm94LiAxNS0yMCUpIG92ZXIgdGhlIGxhcmdlciByYW5nZSBjYW4gYmUgYWNoaWV2ZWQgYnlcclxuICAgKiBhdm9pZGluZyBsYXJnZSBpbnRlZ2VyIG1hdGguXHJcbiAgICpcclxuICAgKiBUaGUgZnVuY3Rpb24gb3BlcmF0aW9uIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHBhdGggaXMgaW52YWxpZCBmb3IgY2xpcHBpbmcuIEEgcGF0aCBpcyBpbnZhbGlkIGZvciBjbGlwcGluZyB3aGVuOlxyXG4gICAqIC0gaXQgaGFzIGxlc3MgdGhhbiAyIHZlcnRpY2VzXHJcbiAgICogLSBpdCBoYXMgMiB2ZXJ0aWNlcyBidXQgaXMgbm90IGFuIG9wZW4gcGF0aFxyXG4gICAqIC0gdGhlIHZlcnRpY2VzIGFyZSBhbGwgY28tbGluZWFyIGFuZCBpdCBpcyBub3QgYW4gb3BlbiBwYXRoXHJcbiAgICovXHJcbiAgZGF0YTogUmVhZG9ubHlQYXRoIHwgUmVhZG9ubHlQYXRocztcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBmb3IgdGhlIGNsaXBUb1BhdGhzIC8gY2xpcFRvUG9seVRyZWUgb3BlcmF0aW9ucy5cclxuICpcclxuICogQW55IG51bWJlciBvZiBzdWJqZWN0IGFuZCBjbGlwIHBhdGhzIGNhbiBiZSBhZGRlZCB0byBhIGNsaXBwaW5nIHRhc2suXHJcbiAqXHJcbiAqIEJvb2xlYW4gKGNsaXBwaW5nKSBvcGVyYXRpb25zIGFyZSBtb3N0bHkgYXBwbGllZCB0byB0d28gc2V0cyBvZiBQb2x5Z29ucywgcmVwcmVzZW50ZWQgaW4gdGhpcyBsaWJyYXJ5IGFzIHN1YmplY3QgYW5kIGNsaXAgcG9seWdvbnMuIFdoZW5ldmVyIFBvbHlnb25zXHJcbiAqIGFyZSBhZGRlZCB0byB0aGUgQ2xpcHBlciBvYmplY3QsIHRoZXkgbXVzdCBiZSBhc3NpZ25lZCB0byBlaXRoZXIgc3ViamVjdCBvciBjbGlwIHBvbHlnb25zLlxyXG4gKlxyXG4gKiBVTklPTiBvcGVyYXRpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gb25lIHNldCBvciBib3RoIHNldHMgb2YgcG9seWdvbnMsIGJ1dCBhbGwgb3RoZXIgYm9vbGVhbiBvcGVyYXRpb25zIHJlcXVpcmUgYm90aCBzZXRzIG9mIHBvbHlnb25zIHRvIGRlcml2ZVxyXG4gKiBtZWFuaW5nZnVsIHNvbHV0aW9ucy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2xpcFBhcmFtcyB7XHJcbiAgLyoqXHJcbiAgICogQ2xpcHBpbmcgb3BlcmF0aW9uIHR5cGUgKEludGVyc2VjdGlvbiwgVW5pb24sIERpZmZlcmVuY2Ugb3IgWG9yKS5cclxuICAgKi9cclxuICBjbGlwVHlwZTogQ2xpcFR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpbmRpbmcgKGZpbGwpIHJ1bGUgZm9yIHN1YmplY3QgcG9seWdvbnMuXHJcbiAgICovXHJcbiAgc3ViamVjdEZpbGxUeXBlOiBQb2x5RmlsbFR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YmplY3QgaW5wdXRzLlxyXG4gICAqL1xyXG4gIHN1YmplY3RJbnB1dHM6IFN1YmplY3RJbnB1dFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaW5kaW5nIChmaWxsKSBydWxlIGZvciBjbGlwcGluZyBwb2x5Z29ucy4gSWYgbWlzc2luZyBpdCB3aWxsIHVzZSB0aGUgc2FtZSBvbmUgYXMgc3ViamVjdEZpbGxUeXBlLlxyXG4gICAqL1xyXG4gIGNsaXBGaWxsVHlwZT86IFBvbHlGaWxsVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xpcHBpbmcgaW5wdXRzLiBOb3QgcmVxdWlyZWQgZm9yIHVuaW9uIG9wZXJhdGlvbnMsIHJlcXVpcmVkIGZvciBvdGhlcnMuXHJcbiAgICovXHJcbiAgY2xpcElucHV0cz86IENsaXBJbnB1dFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUsIHBvbHlnb25zIHJldHVybmVkIGluIHRoZSBzb2x1dGlvbiBwYXJhbWV0ZXIgb2YgdGhlIGNsaXAgbWV0aG9kIHdpbGwgaGF2ZSBvcmllbnRhdGlvbnMgb3Bwb3NpdGUgdG8gdGhlaXIgbm9ybWFsXHJcbiAgICogb3JpZW50YXRpb25zLlxyXG4gICAqL1xyXG4gIHJldmVyc2VTb2x1dGlvbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlcm1pbm9sb2d5OlxyXG4gICAqIC0gQSBzaW1wbGUgcG9seWdvbiBpcyBvbmUgdGhhdCBkb2VzIG5vdCBzZWxmLWludGVyc2VjdC5cclxuICAgKiAtIEEgd2Vha2x5IHNpbXBsZSBwb2x5Z29uIGlzIGEgc2ltcGxlIHBvbHlnb24gdGhhdCBjb250YWlucyAndG91Y2hpbmcnIHZlcnRpY2VzLCBvciAndG91Y2hpbmcnIGVkZ2VzLlxyXG4gICAqIC0gQSBzdHJpY3RseSBzaW1wbGUgcG9seWdvbiBpcyBhIHNpbXBsZSBwb2x5Z29uIHRoYXQgZG9lcyBub3QgY29udGFpbiAndG91Y2hpbmcnIHZlcnRpY2VzLCBvciAndG91Y2hpbmcnIGVkZ2VzLlxyXG4gICAqXHJcbiAgICogVmVydGljZXMgJ3RvdWNoJyBpZiB0aGV5IHNoYXJlIHRoZSBzYW1lIGNvb3JkaW5hdGVzIChhbmQgYXJlIG5vdCBhZGphY2VudCkuIEFuIGVkZ2UgdG91Y2hlcyBhbm90aGVyIGlmIG9uZSBvZiBpdHMgZW5kIHZlcnRpY2VzIHRvdWNoZXMgYW5vdGhlciBlZGdlXHJcbiAgICogZXhjbHVkaW5nIGl0cyBhZGphY2VudCBlZGdlcywgb3IgaWYgdGhleSBhcmUgY28tbGluZWFyIGFuZCBvdmVybGFwcGluZyAoaW5jbHVkaW5nIGFkamFjZW50IGVkZ2VzKS5cclxuICAgKlxyXG4gICAqIFBvbHlnb25zIHJldHVybmVkIGJ5IGNsaXBwaW5nIG9wZXJhdGlvbnMgKHNlZSBDbGlwcGVyLmV4ZWN1dGUoKSkgc2hvdWxkIGFsd2F5cyBiZSBzaW1wbGUgcG9seWdvbnMuIFdoZW4gdGhlIFN0cmljdGx5U2ltcGx5IHByb3BlcnR5IGlzIGVuYWJsZWQsXHJcbiAgICogcG9seWdvbnMgcmV0dXJuZWQgd2lsbCBiZSBzdHJpY3RseSBzaW1wbGUsIG90aGVyd2lzZSB0aGV5IG1heSBiZSB3ZWFrbHkgc2ltcGxlLiBJdCdzIGNvbXB1dGF0aW9uYWxseSBleHBlbnNpdmUgZW5zdXJpbmcgcG9seWdvbnMgYXJlIHN0cmljdGx5IHNpbXBsZVxyXG4gICAqIGFuZCBzbyB0aGlzIHByb3BlcnR5IGlzIGRpc2FibGVkIGJ5IGRlZmF1bHQuXHJcbiAgICpcclxuICAgKiBOb3RlOiBUaGVyZSdzIGN1cnJlbnRseSBubyBndWFyYW50ZWUgdGhhdCBwb2x5Z29ucyB3aWxsIGJlIHN0cmljdGx5IHNpbXBsZSBzaW5jZSAnc2ltcGxpZnlpbmcnIGlzIHN0aWxsIGEgd29yayBpbiBwcm9ncmVzcy5cclxuICAgKi9cclxuICBzdHJpY3RseVNpbXBsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ5IGRlZmF1bHQsIHdoZW4gdGhyZWUgb3IgbW9yZSB2ZXJ0aWNlcyBhcmUgY29sbGluZWFyIGluIGlucHV0IHBvbHlnb25zIChzdWJqZWN0IG9yIGNsaXApLCB0aGUgQ2xpcHBlciBvYmplY3QgcmVtb3ZlcyB0aGUgJ2lubmVyJyB2ZXJ0aWNlcyBiZWZvcmVcclxuICAgKiBjbGlwcGluZy4gV2hlbiBlbmFibGVkIHRoZSBwcmVzZXJ2ZUNvbGxpbmVhciBwcm9wZXJ0eSBwcmV2ZW50cyB0aGlzIGRlZmF1bHQgYmVoYXZpb3IgdG8gYWxsb3cgdGhlc2UgaW5uZXIgdmVydGljZXMgdG8gYXBwZWFyIGluIHRoZSBzb2x1dGlvbi5cclxuICAgKi9cclxuICBwcmVzZXJ2ZUNvbGxpbmVhcj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoaXMgaXMgbm90IHVuZGVmaW5lZCB0aGVuIGNsZWFuaW5nIG9mIHRoZSByZXN1bHQgcG9seWdvbiB3aWxsIGJlIHBlcmZvcm1lZC5cclxuICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBvbmx5IGF2YWlsYWJsZSB3aGVuIHRoZSBvdXRwdXQgZm9ybWF0IGlzIG5vdCBhIHBvbHkgdHJlZS5cclxuICAgKi9cclxuICBjbGVhbkRpc3RhbmNlPzogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBhZGRQYXRoT3JQYXRocyA9IChcclxuICBjbGlwcGVyOiBDbGlwcGVyLFxyXG4gIGlucHV0RGF0YXM6IChTdWJqZWN0SW5wdXQgfCBDbGlwSW5wdXQpW10gfCB1bmRlZmluZWQsXHJcbiAgcG9seVR5cGU6IFBvbHlUeXBlXHJcbikgPT4ge1xyXG4gIGlmIChpbnB1dERhdGFzID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIGFkZCBlYWNoIGlucHV0XHJcbiAgZm9yIChsZXQgaSA9IDAsIG1heGkgPSBpbnB1dERhdGFzLmxlbmd0aDsgaSA8IG1heGk7IGkrKykge1xyXG4gICAgY29uc3QgaW5wdXREYXRhID0gaW5wdXREYXRhc1tpXTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHBhdGgvcGF0aHNcclxuICAgIGNvbnN0IHBhdGhPclBhdGhzID0gaW5wdXREYXRhLmRhdGE7XHJcbiAgICBpZiAoIXBhdGhPclBhdGhzIHx8IHBhdGhPclBhdGhzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlZCA9XHJcbiAgICAgIChpbnB1dERhdGEgYXMgU3ViamVjdElucHV0KS5jbG9zZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAoaW5wdXREYXRhIGFzIFN1YmplY3RJbnB1dCkuY2xvc2VkO1xyXG5cclxuICAgIC8vIGlzIGl0IGEgcGF0aCBvciBwYXRocz9cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGhPclBhdGhzWzBdKSkge1xyXG4gICAgICAvLyBwYXRoc1xyXG4gICAgICBpZiAoIWNsaXBwZXIuYWRkUGF0aHMocGF0aE9yUGF0aHMgYXMgUGF0aHMsIHBvbHlUeXBlLCBjbG9zZWQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENsaXBwZXJFcnJvcihcImludmFsaWQgcGF0aHNcIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHBhdGhcclxuICAgICAgaWYgKCFjbGlwcGVyLmFkZFBhdGgocGF0aE9yUGF0aHMgYXMgUGF0aCwgcG9seVR5cGUsIGNsb3NlZCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ2xpcHBlckVycm9yKFwiaW52YWxpZCBwYXRoXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaXBUb1BhdGhzT3JQb2x5VHJlZShcclxuICBwb2x5VHJlZU1vZGU6IGJvb2xlYW4sXHJcbiAgbmF0aXZlQ2xpcHBlckxpYjogTmF0aXZlQ2xpcHBlckxpYkluc3RhbmNlLFxyXG4gIHBhcmFtczogQ2xpcFBhcmFtc1xyXG4pOiBQYXRocyB8IFBvbHlUcmVlIHtcclxuICBpZiAoZGV2TW9kZSkge1xyXG4gICAgaWYgKCFwb2x5VHJlZU1vZGUgJiYgcGFyYW1zLnN1YmplY3RJbnB1dHMgJiYgcGFyYW1zLnN1YmplY3RJbnB1dHMuc29tZSgoc2kpID0+ICFzaS5jbG9zZWQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNsaXAgdG8gYSBQb2x5VHJlZSAobm90IHRvIGEgUGF0aCkgd2hlbiB1c2luZyBvcGVuIHBhdGhzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xpcHBlciA9IG5ldyBDbGlwcGVyKG5hdGl2ZUNsaXBwZXJMaWIsIHBhcmFtcyk7XHJcblxyXG4gIC8vbm9pbnNwZWN0aW9uIFVudXNlZENhdGNoUGFyYW1ldGVySlNcclxuICB0cnkge1xyXG4gICAgYWRkUGF0aE9yUGF0aHMoY2xpcHBlciwgcGFyYW1zLnN1YmplY3RJbnB1dHMsIFBvbHlUeXBlLlN1YmplY3QpO1xyXG4gICAgYWRkUGF0aE9yUGF0aHMoY2xpcHBlciwgcGFyYW1zLmNsaXBJbnB1dHMsIFBvbHlUeXBlLkNsaXApO1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGNvbnN0IGNsaXBGaWxsVHlwZSA9XHJcbiAgICAgIHBhcmFtcy5jbGlwRmlsbFR5cGUgPT09IHVuZGVmaW5lZCA/IHBhcmFtcy5zdWJqZWN0RmlsbFR5cGUgOiBwYXJhbXMuY2xpcEZpbGxUeXBlO1xyXG4gICAgaWYgKCFwb2x5VHJlZU1vZGUpIHtcclxuICAgICAgcmVzdWx0ID0gY2xpcHBlci5leGVjdXRlVG9QYXRocyhcclxuICAgICAgICBwYXJhbXMuY2xpcFR5cGUsXHJcbiAgICAgICAgcGFyYW1zLnN1YmplY3RGaWxsVHlwZSxcclxuICAgICAgICBjbGlwRmlsbFR5cGUsXHJcbiAgICAgICAgcGFyYW1zLmNsZWFuRGlzdGFuY2VcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChwYXJhbXMuY2xlYW5EaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENsaXBwZXJFcnJvcihcImNsZWFuaW5nIGlzIG5vdCBhdmFpbGFibGUgZm9yIHBvbHkgdHJlZSByZXN1bHRzXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IGNsaXBwZXIuZXhlY3V0ZVRvUG9seVRlZShwYXJhbXMuY2xpcFR5cGUsIHBhcmFtcy5zdWJqZWN0RmlsbFR5cGUsIGNsaXBGaWxsVHlwZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IENsaXBwZXJFcnJvcihcImVycm9yIHdoaWxlIHBlcmZvcm1pbmcgY2xpcHBpbmcgdGFza1wiKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGNsaXBwZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaXBUb1BhdGhzKG5hdGl2ZUNsaXBwZXJMaWI6IE5hdGl2ZUNsaXBwZXJMaWJJbnN0YW5jZSwgcGFyYW1zOiBDbGlwUGFyYW1zKTogUGF0aHMge1xyXG4gIHJldHVybiBjbGlwVG9QYXRoc09yUG9seVRyZWUoZmFsc2UsIG5hdGl2ZUNsaXBwZXJMaWIsIHBhcmFtcykgYXMgUGF0aHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGlwVG9Qb2x5VHJlZShcclxuICBuYXRpdmVDbGlwcGVyTGliOiBOYXRpdmVDbGlwcGVyTGliSW5zdGFuY2UsXHJcbiAgcGFyYW1zOiBDbGlwUGFyYW1zXHJcbik6IFBvbHlUcmVlIHtcclxuICByZXR1cm4gY2xpcFRvUGF0aHNPclBvbHlUcmVlKHRydWUsIG5hdGl2ZUNsaXBwZXJMaWIsIHBhcmFtcykgYXMgUG9seVRyZWU7XHJcbn1cclxuIl19
