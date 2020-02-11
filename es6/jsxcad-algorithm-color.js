// Derived from npm color-namer due to issue with rollup and weak maps.

var colors = [
  { name: 'black', rgb: 0x000000, origin: 'basic' },
  { name: 'blue', rgb: 0x0000FF, origin: 'basic' },
  { name: 'cyan', rgb: 0x00FFFF, origin: 'basic' },
  { name: 'green', rgb: 0x008000, origin: 'basic' },
  { name: 'teal', rgb: 0x008080, origin: 'basic' },
  { name: 'turquoise', rgb: 0x40E0D0, origin: 'basic' },
  { name: 'indigo', rgb: 0x4B0082, origin: 'basic' },
  { name: 'gray', rgb: 0x808080, origin: 'basic' },
  { name: 'purple', rgb: 0x800080, origin: 'basic' },
  { name: 'brown', rgb: 0xA52A2A, origin: 'basic' },
  { name: 'tan', rgb: 0xD2B48C, origin: 'basic' },
  { name: 'violet', rgb: 0xEE82EE, origin: 'basic' },
  { name: 'beige', rgb: 0xF5F5DC, origin: 'basic' },
  { name: 'fuchsia', rgb: 0xFF00FF, origin: 'basic' },
  { name: 'gold', rgb: 0xFFD700, origin: 'basic' },
  { name: 'magenta', rgb: 0xFF00FF, origin: 'basic' },
  { name: 'orange', rgb: 0xFFA500, origin: 'basic' },
  { name: 'pink', rgb: 0xFFC0CB, origin: 'basic' },
  { name: 'red', rgb: 0xFF0000, origin: 'basic' },
  { name: 'white', rgb: 0xFFFFFF, origin: 'basic' },
  { name: 'yellow', rgb: 0xFFFF00, origin: 'basic' },
  { name: 'aqua', rgb: 0x00FFFF, origin: 'html' },
  { name: 'aliceblue', rgb: 0xF0F8FF, origin: 'html' },
  { name: 'antiquewhite', rgb: 0xFAEBD7, origin: 'html' },
  { name: 'black', rgb: 0x000000, origin: 'html' },
  { name: 'blue', rgb: 0x0000FF, origin: 'html' },
  { name: 'cyan', rgb: 0x00FFFF, origin: 'html' },
  { name: 'darkblue', rgb: 0x00008B, origin: 'html' },
  { name: 'darkcyan', rgb: 0x008B8B, origin: 'html' },
  { name: 'darkgreen', rgb: 0x006400, origin: 'html' },
  { name: 'darkturquoise', rgb: 0x00CED1, origin: 'html' },
  { name: 'deepskyblue', rgb: 0x00BFFF, origin: 'html' },
  { name: 'green', rgb: 0x008000, origin: 'html' },
  { name: 'lime', rgb: 0x00FF00, origin: 'html' },
  { name: 'mediumblue', rgb: 0x0000CD, origin: 'html' },
  { name: 'mediumspringgreen', rgb: 0x00FA9A, origin: 'html' },
  { name: 'navy', rgb: 0x000080, origin: 'html' },
  { name: 'springgreen', rgb: 0x00FF7F, origin: 'html' },
  { name: 'teal', rgb: 0x008080, origin: 'html' },
  { name: 'midnightblue', rgb: 0x191970, origin: 'html' },
  { name: 'dodgerblue', rgb: 0x1E90FF, origin: 'html' },
  { name: 'lightseagreen', rgb: 0x20B2AA, origin: 'html' },
  { name: 'forestgreen', rgb: 0x228B22, origin: 'html' },
  { name: 'seagreen', rgb: 0x2E8B57, origin: 'html' },
  { name: 'darkslategray', rgb: 0x2F4F4F, origin: 'html' },
  { name: 'darkslategrey', rgb: 0x2F4F4F, origin: 'html' },
  { name: 'limegreen', rgb: 0x32CD32, origin: 'html' },
  { name: 'mediumseagreen', rgb: 0x3CB371, origin: 'html' },
  { name: 'turquoise', rgb: 0x40E0D0, origin: 'html' },
  { name: 'royalblue', rgb: 0x4169E1, origin: 'html' },
  { name: 'steelblue', rgb: 0x4682B4, origin: 'html' },
  { name: 'darkslateblue', rgb: 0x483D8B, origin: 'html' },
  { name: 'mediumturquoise', rgb: 0x48D1CC, origin: 'html' },
  { name: 'indigo', rgb: 0x4B0082, origin: 'html' },
  { name: 'darkolivegreen', rgb: 0x556B2F, origin: 'html' },
  { name: 'cadetblue', rgb: 0x5F9EA0, origin: 'html' },
  { name: 'cornflowerblue', rgb: 0x6495ED, origin: 'html' },
  { name: 'mediumaquamarine', rgb: 0x66CDAA, origin: 'html' },
  { name: 'dimgray', rgb: 0x696969, origin: 'html' },
  { name: 'dimgrey', rgb: 0x696969, origin: 'html' },
  { name: 'slateblue', rgb: 0x6A5ACD, origin: 'html' },
  { name: 'olivedrab', rgb: 0x6B8E23, origin: 'html' },
  { name: 'slategray', rgb: 0x708090, origin: 'html' },
  { name: 'slategrey', rgb: 0x708090, origin: 'html' },
  { name: 'lightslategray', rgb: 0x778899, origin: 'html' },
  { name: 'lightslategrey', rgb: 0x778899, origin: 'html' },
  { name: 'mediumslateblue', rgb: 0x7B68EE, origin: 'html' },
  { name: 'lawngreen', rgb: 0x7CFC00, origin: 'html' },
  { name: 'aquamarine', rgb: 0x7FFFD4, origin: 'html' },
  { name: 'chartreuse', rgb: 0x7FFF00, origin: 'html' },
  { name: 'gray', rgb: 0x808080, origin: 'html' },
  { name: 'grey', rgb: 0x808080, origin: 'html' },
  { name: 'maroon', rgb: 0x800000, origin: 'html' },
  { name: 'olive', rgb: 0x808000, origin: 'html' },
  { name: 'purple', rgb: 0x800080, origin: 'html' },
  { name: 'lightskyblue', rgb: 0x87CEFA, origin: 'html' },
  { name: 'skyblue', rgb: 0x87CEEB, origin: 'html' },
  { name: 'blueviolet', rgb: 0x8A2BE2, origin: 'html' },
  { name: 'darkmagenta', rgb: 0x8B008B, origin: 'html' },
  { name: 'darkred', rgb: 0x8B0000, origin: 'html' },
  { name: 'saddlebrown', rgb: 0x8B4513, origin: 'html' },
  { name: 'darkseagreen', rgb: 0x8FBC8F, origin: 'html' },
  { name: 'lightgreen', rgb: 0x90EE90, origin: 'html' },
  { name: 'mediumpurple', rgb: 0x9370DB, origin: 'html' },
  { name: 'darkviolet', rgb: 0x9400D3, origin: 'html' },
  { name: 'palegreen', rgb: 0x98FB98, origin: 'html' },
  { name: 'darkorchid', rgb: 0x9932CC, origin: 'html' },
  { name: 'yellowgreen', rgb: 0x9ACD32, origin: 'html' },
  { name: 'sienna', rgb: 0xA0522D, origin: 'html' },
  { name: 'brown', rgb: 0xA52A2A, origin: 'html' },
  { name: 'darkgray', rgb: 0xA9A9A9, origin: 'html' },
  { name: 'darkgrey', rgb: 0xA9A9A9, origin: 'html' },
  { name: 'greenyellow', rgb: 0xADFF2F, origin: 'html' },
  { name: 'lightblue', rgb: 0xADD8E6, origin: 'html' },
  { name: 'paleturquoise', rgb: 0xAFEEEE, origin: 'html' },
  { name: 'lightsteelblue', rgb: 0xB0C4DE, origin: 'html' },
  { name: 'powderblue', rgb: 0xB0E0E6, origin: 'html' },
  { name: 'firebrick', rgb: 0xB22222, origin: 'html' },
  { name: 'darkgoldenrod', rgb: 0xB8860B, origin: 'html' },
  { name: 'mediumorchid', rgb: 0xBA55D3, origin: 'html' },
  { name: 'rosybrown', rgb: 0xBC8F8F, origin: 'html' },
  { name: 'darkkhaki', rgb: 0xBDB76B, origin: 'html' },
  { name: 'silver', rgb: 0xC0C0C0, origin: 'html' },
  { name: 'mediumvioletred', rgb: 0xC71585, origin: 'html' },
  { name: 'indianred', rgb: 0xCD5C5C, origin: 'html' },
  { name: 'peru', rgb: 0xCD853F, origin: 'html' },
  { name: 'chocolate', rgb: 0xD2691E, origin: 'html' },
  { name: 'tan', rgb: 0xD2B48C, origin: 'html' },
  { name: 'lightgray', rgb: 0xD3D3D3, origin: 'html' },
  { name: 'lightgrey', rgb: 0xD3D3D3, origin: 'html' },
  { name: 'thistle', rgb: 0xD8BFD8, origin: 'html' },
  { name: 'goldenrod', rgb: 0xDAA520, origin: 'html' },
  { name: 'orchid', rgb: 0xDA70D6, origin: 'html' },
  { name: 'palevioletred', rgb: 0xDB7093, origin: 'html' },
  { name: 'crimson', rgb: 0xDC143C, origin: 'html' },
  { name: 'gainsboro', rgb: 0xDCDCDC, origin: 'html' },
  { name: 'plum', rgb: 0xDDA0DD, origin: 'html' },
  { name: 'burlywood', rgb: 0xDEB887, origin: 'html' },
  { name: 'lightcyan', rgb: 0xE0FFFF, origin: 'html' },
  { name: 'lavender', rgb: 0xE6E6FA, origin: 'html' },
  { name: 'darksalmon', rgb: 0xE9967A, origin: 'html' },
  { name: 'palegoldenrod', rgb: 0xEEE8AA, origin: 'html' },
  { name: 'violet', rgb: 0xEE82EE, origin: 'html' },
  { name: 'azure', rgb: 0xF0FFFF, origin: 'html' },
  { name: 'honeydew', rgb: 0xF0FFF0, origin: 'html' },
  { name: 'khaki', rgb: 0xF0E68C, origin: 'html' },
  { name: 'lightcoral', rgb: 0xF08080, origin: 'html' },
  { name: 'sandybrown', rgb: 0xF4A460, origin: 'html' },
  { name: 'beige', rgb: 0xF5F5DC, origin: 'html' },
  { name: 'mintcream', rgb: 0xF5FFFA, origin: 'html' },
  { name: 'wheat', rgb: 0xF5DEB3, origin: 'html' },
  { name: 'whitesmoke', rgb: 0xF5F5F5, origin: 'html' },
  { name: 'ghostwhite', rgb: 0xF8F8FF, origin: 'html' },
  { name: 'lightgoldenrodyellow', rgb: 0xFAFAD2, origin: 'html' },
  { name: 'linen', rgb: 0xFAF0E6, origin: 'html' },
  { name: 'salmon', rgb: 0xFA8072, origin: 'html' },
  { name: 'oldlace', rgb: 0xFDF5E6, origin: 'html' },
  { name: 'bisque', rgb: 0xFFE4C4, origin: 'html' },
  { name: 'blanchedalmond', rgb: 0xFFEBCD, origin: 'html' },
  { name: 'coral', rgb: 0xFF7F50, origin: 'html' },
  { name: 'cornsilk', rgb: 0xFFF8DC, origin: 'html' },
  { name: 'darkorange', rgb: 0xFF8C00, origin: 'html' },
  { name: 'deeppink', rgb: 0xFF1493, origin: 'html' },
  { name: 'floralwhite', rgb: 0xFFFAF0, origin: 'html' },
  { name: 'fuchsia', rgb: 0xFF00FF, origin: 'html' },
  { name: 'gold', rgb: 0xFFD700, origin: 'html' },
  { name: 'hotpink', rgb: 0xFF69B4, origin: 'html' },
  { name: 'ivory', rgb: 0xFFFFF0, origin: 'html' },
  { name: 'lavenderblush', rgb: 0xFFF0F5, origin: 'html' },
  { name: 'lemonchiffon', rgb: 0xFFFACD, origin: 'html' },
  { name: 'lightpink', rgb: 0xFFB6C1, origin: 'html' },
  { name: 'lightsalmon', rgb: 0xFFA07A, origin: 'html' },
  { name: 'lightyellow', rgb: 0xFFFFE0, origin: 'html' },
  { name: 'magenta', rgb: 0xFF00FF, origin: 'html' },
  { name: 'mistyrose', rgb: 0xFFE4E1, origin: 'html' },
  { name: 'moccasin', rgb: 0xFFE4B5, origin: 'html' },
  { name: 'navajowhite', rgb: 0xFFDEAD, origin: 'html' },
  { name: 'orange', rgb: 0xFFA500, origin: 'html' },
  { name: 'orangered', rgb: 0xFF4500, origin: 'html' },
  { name: 'papayawhip', rgb: 0xFFEFD5, origin: 'html' },
  { name: 'peachpuff', rgb: 0xFFDAB9, origin: 'html' },
  { name: 'pink', rgb: 0xFFC0CB, origin: 'html' },
  { name: 'red', rgb: 0xFF0000, origin: 'html' },
  { name: 'seashell', rgb: 0xFFF5EE, origin: 'html' },
  { name: 'snow', rgb: 0xFFFAFA, origin: 'html' },
  { name: 'tomato', rgb: 0xFF6347, origin: 'html' },
  { name: 'white', rgb: 0xFFFFFF, origin: 'html' },
  { name: 'yellow', rgb: 0xFFFF00, origin: 'html' },
  { name: 'black', rgb: 0x000000, origin: './ntc' },
  { name: 'navy blue', rgb: 0x000080, origin: './ntc' },
  { name: 'dark blue', rgb: 0x0000C8, origin: './ntc' },
  { name: 'blue', rgb: 0x0000FF, origin: './ntc' },
  { name: 'stratos', rgb: 0x000741, origin: './ntc' },
  { name: 'swamp', rgb: 0x001B1C, origin: './ntc' },
  { name: 'resolution blue', rgb: 0x002387, origin: './ntc' },
  { name: 'deep fir', rgb: 0x002900, origin: './ntc' },
  { name: 'burnham', rgb: 0x002E20, origin: './ntc' },
  { name: 'international klein blue', rgb: 0x002FA7, origin: './ntc' },
  { name: 'prussian blue', rgb: 0x003153, origin: './ntc' },
  { name: 'midnight blue', rgb: 0x003366, origin: './ntc' },
  { name: 'smalt', rgb: 0x003399, origin: './ntc' },
  { name: 'deep teal', rgb: 0x003532, origin: './ntc' },
  { name: 'cyprus', rgb: 0x003E40, origin: './ntc' },
  { name: 'kaitoke green', rgb: 0x004620, origin: './ntc' },
  { name: 'cobalt', rgb: 0x0047AB, origin: './ntc' },
  { name: 'crusoe', rgb: 0x004816, origin: './ntc' },
  { name: 'sherpa blue', rgb: 0x004950, origin: './ntc' },
  { name: 'endeavour', rgb: 0x0056A7, origin: './ntc' },
  { name: 'camarone', rgb: 0x00581A, origin: './ntc' },
  { name: 'science blue', rgb: 0x0066CC, origin: './ntc' },
  { name: 'blue ribbon', rgb: 0x0066FF, origin: './ntc' },
  { name: 'tropical rain forest', rgb: 0x00755E, origin: './ntc' },
  { name: 'allports', rgb: 0x0076A3, origin: './ntc' },
  { name: 'deep cerulean', rgb: 0x007BA7, origin: './ntc' },
  { name: 'lochmara', rgb: 0x007EC7, origin: './ntc' },
  { name: 'azure radiance', rgb: 0x007FFF, origin: './ntc' },
  { name: 'teal', rgb: 0x008080, origin: './ntc' },
  { name: 'bondi blue', rgb: 0x0095B6, origin: './ntc' },
  { name: 'pacific blue', rgb: 0x009DC4, origin: './ntc' },
  { name: 'persian green', rgb: 0x00A693, origin: './ntc' },
  { name: 'jade', rgb: 0x00A86B, origin: './ntc' },
  { name: 'caribbean green', rgb: 0x00CC99, origin: './ntc' },
  { name: "robin's egg blue", rgb: 0x00CCCC, origin: './ntc' },
  { name: 'green', rgb: 0x00FF00, origin: './ntc' },
  { name: 'spring green', rgb: 0x00FF7F, origin: './ntc' },
  { name: 'cyan / aqua', rgb: 0x00FFFF, origin: './ntc' },
  { name: 'blue charcoal', rgb: 0x010D1A, origin: './ntc' },
  { name: 'midnight', rgb: 0x011635, origin: './ntc' },
  { name: 'holly', rgb: 0x011D13, origin: './ntc' },
  { name: 'daintree', rgb: 0x012731, origin: './ntc' },
  { name: 'cardin green', rgb: 0x01361C, origin: './ntc' },
  { name: 'county green', rgb: 0x01371A, origin: './ntc' },
  { name: 'astronaut blue', rgb: 0x013E62, origin: './ntc' },
  { name: 'regal blue', rgb: 0x013F6A, origin: './ntc' },
  { name: 'aqua deep', rgb: 0x014B43, origin: './ntc' },
  { name: 'orient', rgb: 0x015E85, origin: './ntc' },
  { name: 'blue stone', rgb: 0x016162, origin: './ntc' },
  { name: 'fun green', rgb: 0x016D39, origin: './ntc' },
  { name: 'pine green', rgb: 0x01796F, origin: './ntc' },
  { name: 'blue lagoon', rgb: 0x017987, origin: './ntc' },
  { name: 'deep sea', rgb: 0x01826B, origin: './ntc' },
  { name: 'green haze', rgb: 0x01A368, origin: './ntc' },
  { name: 'english holly', rgb: 0x022D15, origin: './ntc' },
  { name: 'sherwood green', rgb: 0x02402C, origin: './ntc' },
  { name: 'congress blue', rgb: 0x02478E, origin: './ntc' },
  { name: 'evening sea', rgb: 0x024E46, origin: './ntc' },
  { name: 'bahama blue', rgb: 0x026395, origin: './ntc' },
  { name: 'observatory', rgb: 0x02866F, origin: './ntc' },
  { name: 'cerulean', rgb: 0x02A4D3, origin: './ntc' },
  { name: 'tangaroa', rgb: 0x03163C, origin: './ntc' },
  { name: 'green vogue', rgb: 0x032B52, origin: './ntc' },
  { name: 'mosque', rgb: 0x036A6E, origin: './ntc' },
  { name: 'midnight moss', rgb: 0x041004, origin: './ntc' },
  { name: 'black pearl', rgb: 0x041322, origin: './ntc' },
  { name: 'blue whale', rgb: 0x042E4C, origin: './ntc' },
  { name: 'zuccini', rgb: 0x044022, origin: './ntc' },
  { name: 'teal blue', rgb: 0x044259, origin: './ntc' },
  { name: 'deep cove', rgb: 0x051040, origin: './ntc' },
  { name: 'gulf blue', rgb: 0x051657, origin: './ntc' },
  { name: 'venice blue', rgb: 0x055989, origin: './ntc' },
  { name: 'watercourse', rgb: 0x056F57, origin: './ntc' },
  { name: 'catalina blue', rgb: 0x062A78, origin: './ntc' },
  { name: 'tiber', rgb: 0x063537, origin: './ntc' },
  { name: 'gossamer', rgb: 0x069B81, origin: './ntc' },
  { name: 'niagara', rgb: 0x06A189, origin: './ntc' },
  { name: 'tarawera', rgb: 0x073A50, origin: './ntc' },
  { name: 'jaguar', rgb: 0x080110, origin: './ntc' },
  { name: 'black bean', rgb: 0x081910, origin: './ntc' },
  { name: 'deep sapphire', rgb: 0x082567, origin: './ntc' },
  { name: 'elf green', rgb: 0x088370, origin: './ntc' },
  { name: 'bright turquoise', rgb: 0x08E8DE, origin: './ntc' },
  { name: 'downriver', rgb: 0x092256, origin: './ntc' },
  { name: 'palm green', rgb: 0x09230F, origin: './ntc' },
  { name: 'madison', rgb: 0x09255D, origin: './ntc' },
  { name: 'bottle green', rgb: 0x093624, origin: './ntc' },
  { name: 'deep sea green', rgb: 0x095859, origin: './ntc' },
  { name: 'salem', rgb: 0x097F4B, origin: './ntc' },
  { name: 'black russian', rgb: 0x0A001C, origin: './ntc' },
  { name: 'dark fern', rgb: 0x0A480D, origin: './ntc' },
  { name: 'japanese laurel', rgb: 0x0A6906, origin: './ntc' },
  { name: 'atoll', rgb: 0x0A6F75, origin: './ntc' },
  { name: 'cod gray', rgb: 0x0B0B0B, origin: './ntc' },
  { name: 'marshland', rgb: 0x0B0F08, origin: './ntc' },
  { name: 'gordons green', rgb: 0x0B1107, origin: './ntc' },
  { name: 'black forest', rgb: 0x0B1304, origin: './ntc' },
  { name: 'san felix', rgb: 0x0B6207, origin: './ntc' },
  { name: 'malachite', rgb: 0x0BDA51, origin: './ntc' },
  { name: 'ebony', rgb: 0x0C0B1D, origin: './ntc' },
  { name: 'woodsmoke', rgb: 0x0C0D0F, origin: './ntc' },
  { name: 'racing green', rgb: 0x0C1911, origin: './ntc' },
  { name: 'surfie green', rgb: 0x0C7A79, origin: './ntc' },
  { name: 'blue chill', rgb: 0x0C8990, origin: './ntc' },
  { name: 'black rock', rgb: 0x0D0332, origin: './ntc' },
  { name: 'bunker', rgb: 0x0D1117, origin: './ntc' },
  { name: 'aztec', rgb: 0x0D1C19, origin: './ntc' },
  { name: 'bush', rgb: 0x0D2E1C, origin: './ntc' },
  { name: 'cinder', rgb: 0x0E0E18, origin: './ntc' },
  { name: 'firefly', rgb: 0x0E2A30, origin: './ntc' },
  { name: 'torea bay', rgb: 0x0F2D9E, origin: './ntc' },
  { name: 'vulcan', rgb: 0x10121D, origin: './ntc' },
  { name: 'green waterloo', rgb: 0x101405, origin: './ntc' },
  { name: 'eden', rgb: 0x105852, origin: './ntc' },
  { name: 'arapawa', rgb: 0x110C6C, origin: './ntc' },
  { name: 'ultramarine', rgb: 0x120A8F, origin: './ntc' },
  { name: 'elephant', rgb: 0x123447, origin: './ntc' },
  { name: 'jewel', rgb: 0x126B40, origin: './ntc' },
  { name: 'diesel', rgb: 0x130000, origin: './ntc' },
  { name: 'asphalt', rgb: 0x130A06, origin: './ntc' },
  { name: 'blue zodiac', rgb: 0x13264D, origin: './ntc' },
  { name: 'parsley', rgb: 0x134F19, origin: './ntc' },
  { name: 'nero', rgb: 0x140600, origin: './ntc' },
  { name: 'tory blue', rgb: 0x1450AA, origin: './ntc' },
  { name: 'bunting', rgb: 0x151F4C, origin: './ntc' },
  { name: 'denim', rgb: 0x1560BD, origin: './ntc' },
  { name: 'genoa', rgb: 0x15736B, origin: './ntc' },
  { name: 'mirage', rgb: 0x161928, origin: './ntc' },
  { name: 'hunter green', rgb: 0x161D10, origin: './ntc' },
  { name: 'big stone', rgb: 0x162A40, origin: './ntc' },
  { name: 'celtic', rgb: 0x163222, origin: './ntc' },
  { name: 'timber green', rgb: 0x16322C, origin: './ntc' },
  { name: 'gable green', rgb: 0x163531, origin: './ntc' },
  { name: 'pine tree', rgb: 0x171F04, origin: './ntc' },
  { name: 'chathams blue', rgb: 0x175579, origin: './ntc' },
  { name: 'deep forest green', rgb: 0x182D09, origin: './ntc' },
  { name: 'blumine', rgb: 0x18587A, origin: './ntc' },
  { name: 'palm leaf', rgb: 0x19330E, origin: './ntc' },
  { name: 'nile blue', rgb: 0x193751, origin: './ntc' },
  { name: 'fun blue', rgb: 0x1959A8, origin: './ntc' },
  { name: 'lucky point', rgb: 0x1A1A68, origin: './ntc' },
  { name: 'mountain meadow', rgb: 0x1AB385, origin: './ntc' },
  { name: 'tolopea', rgb: 0x1B0245, origin: './ntc' },
  { name: 'haiti', rgb: 0x1B1035, origin: './ntc' },
  { name: 'deep koamaru', rgb: 0x1B127B, origin: './ntc' },
  { name: 'acadia', rgb: 0x1B1404, origin: './ntc' },
  { name: 'seaweed', rgb: 0x1B2F11, origin: './ntc' },
  { name: 'biscay', rgb: 0x1B3162, origin: './ntc' },
  { name: 'matisse', rgb: 0x1B659D, origin: './ntc' },
  { name: 'crowshead', rgb: 0x1C1208, origin: './ntc' },
  { name: 'rangoon green', rgb: 0x1C1E13, origin: './ntc' },
  { name: 'persian blue', rgb: 0x1C39BB, origin: './ntc' },
  { name: 'everglade', rgb: 0x1C402E, origin: './ntc' },
  { name: 'elm', rgb: 0x1C7C7D, origin: './ntc' },
  { name: 'green pea', rgb: 0x1D6142, origin: './ntc' },
  { name: 'creole', rgb: 0x1E0F04, origin: './ntc' },
  { name: 'karaka', rgb: 0x1E1609, origin: './ntc' },
  { name: 'el paso', rgb: 0x1E1708, origin: './ntc' },
  { name: 'cello', rgb: 0x1E385B, origin: './ntc' },
  { name: 'te papa green', rgb: 0x1E433C, origin: './ntc' },
  { name: 'dodger blue', rgb: 0x1E90FF, origin: './ntc' },
  { name: 'eastern blue', rgb: 0x1E9AB0, origin: './ntc' },
  { name: 'night rider', rgb: 0x1F120F, origin: './ntc' },
  { name: 'java', rgb: 0x1FC2C2, origin: './ntc' },
  { name: 'jacksons purple', rgb: 0x20208D, origin: './ntc' },
  { name: 'cloud burst', rgb: 0x202E54, origin: './ntc' },
  { name: 'blue dianne', rgb: 0x204852, origin: './ntc' },
  { name: 'eternity', rgb: 0x211A0E, origin: './ntc' },
  { name: 'deep blue', rgb: 0x220878, origin: './ntc' },
  { name: 'forest green', rgb: 0x228B22, origin: './ntc' },
  { name: 'mallard', rgb: 0x233418, origin: './ntc' },
  { name: 'violet', rgb: 0x240A40, origin: './ntc' },
  { name: 'kilamanjaro', rgb: 0x240C02, origin: './ntc' },
  { name: 'log cabin', rgb: 0x242A1D, origin: './ntc' },
  { name: 'black olive', rgb: 0x242E16, origin: './ntc' },
  { name: 'green house', rgb: 0x24500F, origin: './ntc' },
  { name: 'graphite', rgb: 0x251607, origin: './ntc' },
  { name: 'cannon black', rgb: 0x251706, origin: './ntc' },
  { name: 'port gore', rgb: 0x251F4F, origin: './ntc' },
  { name: 'shark', rgb: 0x25272C, origin: './ntc' },
  { name: 'green kelp', rgb: 0x25311C, origin: './ntc' },
  { name: 'curious blue', rgb: 0x2596D1, origin: './ntc' },
  { name: 'paua', rgb: 0x260368, origin: './ntc' },
  { name: 'paris m', rgb: 0x26056A, origin: './ntc' },
  { name: 'wood bark', rgb: 0x261105, origin: './ntc' },
  { name: 'gondola', rgb: 0x261414, origin: './ntc' },
  { name: 'steel gray', rgb: 0x262335, origin: './ntc' },
  { name: 'ebony clay', rgb: 0x26283B, origin: './ntc' },
  { name: 'bay of many', rgb: 0x273A81, origin: './ntc' },
  { name: 'plantation', rgb: 0x27504B, origin: './ntc' },
  { name: 'eucalyptus', rgb: 0x278A5B, origin: './ntc' },
  { name: 'oil', rgb: 0x281E15, origin: './ntc' },
  { name: 'astronaut', rgb: 0x283A77, origin: './ntc' },
  { name: 'mariner', rgb: 0x286ACD, origin: './ntc' },
  { name: 'violent violet', rgb: 0x290C5E, origin: './ntc' },
  { name: 'bastille', rgb: 0x292130, origin: './ntc' },
  { name: 'zeus', rgb: 0x292319, origin: './ntc' },
  { name: 'charade', rgb: 0x292937, origin: './ntc' },
  { name: 'jelly bean', rgb: 0x297B9A, origin: './ntc' },
  { name: 'jungle green', rgb: 0x29AB87, origin: './ntc' },
  { name: 'cherry pie', rgb: 0x2A0359, origin: './ntc' },
  { name: 'coffee bean', rgb: 0x2A140E, origin: './ntc' },
  { name: 'baltic sea', rgb: 0x2A2630, origin: './ntc' },
  { name: 'turtle green', rgb: 0x2A380B, origin: './ntc' },
  { name: 'cerulean blue', rgb: 0x2A52BE, origin: './ntc' },
  { name: 'sepia black', rgb: 0x2B0202, origin: './ntc' },
  { name: 'valhalla', rgb: 0x2B194F, origin: './ntc' },
  { name: 'heavy metal', rgb: 0x2B3228, origin: './ntc' },
  { name: 'blue gem', rgb: 0x2C0E8C, origin: './ntc' },
  { name: 'revolver', rgb: 0x2C1632, origin: './ntc' },
  { name: 'bleached cedar', rgb: 0x2C2133, origin: './ntc' },
  { name: 'lochinvar', rgb: 0x2C8C84, origin: './ntc' },
  { name: 'mikado', rgb: 0x2D2510, origin: './ntc' },
  { name: 'outer space', rgb: 0x2D383A, origin: './ntc' },
  { name: 'st tropaz', rgb: 0x2D569B, origin: './ntc' },
  { name: 'jacaranda', rgb: 0x2E0329, origin: './ntc' },
  { name: 'jacko bean', rgb: 0x2E1905, origin: './ntc' },
  { name: 'rangitoto', rgb: 0x2E3222, origin: './ntc' },
  { name: 'rhino', rgb: 0x2E3F62, origin: './ntc' },
  { name: 'sea green', rgb: 0x2E8B57, origin: './ntc' },
  { name: 'scooter', rgb: 0x2EBFD4, origin: './ntc' },
  { name: 'onion', rgb: 0x2F270E, origin: './ntc' },
  { name: 'governor bay', rgb: 0x2F3CB3, origin: './ntc' },
  { name: 'sapphire', rgb: 0x2F519E, origin: './ntc' },
  { name: 'spectra', rgb: 0x2F5A57, origin: './ntc' },
  { name: 'casal', rgb: 0x2F6168, origin: './ntc' },
  { name: 'melanzane', rgb: 0x300529, origin: './ntc' },
  { name: 'cocoa brown', rgb: 0x301F1E, origin: './ntc' },
  { name: 'woodrush', rgb: 0x302A0F, origin: './ntc' },
  { name: 'san juan', rgb: 0x304B6A, origin: './ntc' },
  { name: 'turquoise', rgb: 0x30D5C8, origin: './ntc' },
  { name: 'eclipse', rgb: 0x311C17, origin: './ntc' },
  { name: 'pickled bluewood', rgb: 0x314459, origin: './ntc' },
  { name: 'azure', rgb: 0x315BA1, origin: './ntc' },
  { name: 'calypso', rgb: 0x31728D, origin: './ntc' },
  { name: 'paradiso', rgb: 0x317D82, origin: './ntc' },
  { name: 'persian indigo', rgb: 0x32127A, origin: './ntc' },
  { name: 'blackcurrant', rgb: 0x32293A, origin: './ntc' },
  { name: 'mine shaft', rgb: 0x323232, origin: './ntc' },
  { name: 'stromboli', rgb: 0x325D52, origin: './ntc' },
  { name: 'bilbao', rgb: 0x327C14, origin: './ntc' },
  { name: 'astral', rgb: 0x327DA0, origin: './ntc' },
  { name: 'christalle', rgb: 0x33036B, origin: './ntc' },
  { name: 'thunder', rgb: 0x33292F, origin: './ntc' },
  { name: 'shamrock', rgb: 0x33CC99, origin: './ntc' },
  { name: 'tamarind', rgb: 0x341515, origin: './ntc' },
  { name: 'mardi gras', rgb: 0x350036, origin: './ntc' },
  { name: 'valentino', rgb: 0x350E42, origin: './ntc' },
  { name: 'jagger', rgb: 0x350E57, origin: './ntc' },
  { name: 'tuna', rgb: 0x353542, origin: './ntc' },
  { name: 'chambray', rgb: 0x354E8C, origin: './ntc' },
  { name: 'martinique', rgb: 0x363050, origin: './ntc' },
  { name: 'tuatara', rgb: 0x363534, origin: './ntc' },
  { name: 'waiouru', rgb: 0x363C0D, origin: './ntc' },
  { name: 'ming', rgb: 0x36747D, origin: './ntc' },
  { name: 'la palma', rgb: 0x368716, origin: './ntc' },
  { name: 'chocolate', rgb: 0x370202, origin: './ntc' },
  { name: 'clinker', rgb: 0x371D09, origin: './ntc' },
  { name: 'brown tumbleweed', rgb: 0x37290E, origin: './ntc' },
  { name: 'birch', rgb: 0x373021, origin: './ntc' },
  { name: 'oracle', rgb: 0x377475, origin: './ntc' },
  { name: 'blue diamond', rgb: 0x380474, origin: './ntc' },
  { name: 'grape', rgb: 0x381A51, origin: './ntc' },
  { name: 'dune', rgb: 0x383533, origin: './ntc' },
  { name: 'oxford blue', rgb: 0x384555, origin: './ntc' },
  { name: 'clover', rgb: 0x384910, origin: './ntc' },
  { name: 'limed spruce', rgb: 0x394851, origin: './ntc' },
  { name: 'dell', rgb: 0x396413, origin: './ntc' },
  { name: 'toledo', rgb: 0x3A0020, origin: './ntc' },
  { name: 'sambuca', rgb: 0x3A2010, origin: './ntc' },
  { name: 'jacarta', rgb: 0x3A2A6A, origin: './ntc' },
  { name: 'william', rgb: 0x3A686C, origin: './ntc' },
  { name: 'killarney', rgb: 0x3A6A47, origin: './ntc' },
  { name: 'keppel', rgb: 0x3AB09E, origin: './ntc' },
  { name: 'temptress', rgb: 0x3B000B, origin: './ntc' },
  { name: 'aubergine', rgb: 0x3B0910, origin: './ntc' },
  { name: 'jon', rgb: 0x3B1F1F, origin: './ntc' },
  { name: 'treehouse', rgb: 0x3B2820, origin: './ntc' },
  { name: 'amazon', rgb: 0x3B7A57, origin: './ntc' },
  { name: 'boston blue', rgb: 0x3B91B4, origin: './ntc' },
  { name: 'windsor', rgb: 0x3C0878, origin: './ntc' },
  { name: 'rebel', rgb: 0x3C1206, origin: './ntc' },
  { name: 'meteorite', rgb: 0x3C1F76, origin: './ntc' },
  { name: 'dark ebony', rgb: 0x3C2005, origin: './ntc' },
  { name: 'camouflage', rgb: 0x3C3910, origin: './ntc' },
  { name: 'bright gray', rgb: 0x3C4151, origin: './ntc' },
  { name: 'cape cod', rgb: 0x3C4443, origin: './ntc' },
  { name: 'lunar green', rgb: 0x3C493A, origin: './ntc' },
  { name: 'bean  ', rgb: 0x3D0C02, origin: './ntc' },
  { name: 'bistre', rgb: 0x3D2B1F, origin: './ntc' },
  { name: 'goblin', rgb: 0x3D7D52, origin: './ntc' },
  { name: 'kingfisher daisy', rgb: 0x3E0480, origin: './ntc' },
  { name: 'cedar', rgb: 0x3E1C14, origin: './ntc' },
  { name: 'english walnut', rgb: 0x3E2B23, origin: './ntc' },
  { name: 'black marlin', rgb: 0x3E2C1C, origin: './ntc' },
  { name: 'ship gray', rgb: 0x3E3A44, origin: './ntc' },
  { name: 'pelorous', rgb: 0x3EABBF, origin: './ntc' },
  { name: 'bronze', rgb: 0x3F2109, origin: './ntc' },
  { name: 'cola', rgb: 0x3F2500, origin: './ntc' },
  { name: 'madras', rgb: 0x3F3002, origin: './ntc' },
  { name: 'minsk', rgb: 0x3F307F, origin: './ntc' },
  { name: 'cabbage pont', rgb: 0x3F4C3A, origin: './ntc' },
  { name: 'tom thumb', rgb: 0x3F583B, origin: './ntc' },
  { name: 'mineral green', rgb: 0x3F5D53, origin: './ntc' },
  { name: 'puerto rico', rgb: 0x3FC1AA, origin: './ntc' },
  { name: 'harlequin', rgb: 0x3FFF00, origin: './ntc' },
  { name: 'brown pod', rgb: 0x401801, origin: './ntc' },
  { name: 'cork', rgb: 0x40291D, origin: './ntc' },
  { name: 'masala', rgb: 0x403B38, origin: './ntc' },
  { name: 'thatch green', rgb: 0x403D19, origin: './ntc' },
  { name: 'fiord', rgb: 0x405169, origin: './ntc' },
  { name: 'viridian', rgb: 0x40826D, origin: './ntc' },
  { name: 'chateau green', rgb: 0x40A860, origin: './ntc' },
  { name: 'ripe plum', rgb: 0x410056, origin: './ntc' },
  { name: 'paco', rgb: 0x411F10, origin: './ntc' },
  { name: 'deep oak', rgb: 0x412010, origin: './ntc' },
  { name: 'merlin', rgb: 0x413C37, origin: './ntc' },
  { name: 'gun powder', rgb: 0x414257, origin: './ntc' },
  { name: 'east bay', rgb: 0x414C7D, origin: './ntc' },
  { name: 'royal blue', rgb: 0x4169E1, origin: './ntc' },
  { name: 'ocean green', rgb: 0x41AA78, origin: './ntc' },
  { name: 'burnt maroon', rgb: 0x420303, origin: './ntc' },
  { name: 'lisbon brown', rgb: 0x423921, origin: './ntc' },
  { name: 'faded jade', rgb: 0x427977, origin: './ntc' },
  { name: 'scarlet gum', rgb: 0x431560, origin: './ntc' },
  { name: 'iroko', rgb: 0x433120, origin: './ntc' },
  { name: 'armadillo', rgb: 0x433E37, origin: './ntc' },
  { name: 'river bed', rgb: 0x434C59, origin: './ntc' },
  { name: 'green leaf', rgb: 0x436A0D, origin: './ntc' },
  { name: 'barossa', rgb: 0x44012D, origin: './ntc' },
  { name: 'morocco brown', rgb: 0x441D00, origin: './ntc' },
  { name: 'mako', rgb: 0x444954, origin: './ntc' },
  { name: 'kelp', rgb: 0x454936, origin: './ntc' },
  { name: 'san marino', rgb: 0x456CAC, origin: './ntc' },
  { name: 'picton blue', rgb: 0x45B1E8, origin: './ntc' },
  { name: 'loulou', rgb: 0x460B41, origin: './ntc' },
  { name: 'crater brown', rgb: 0x462425, origin: './ntc' },
  { name: 'gray asparagus', rgb: 0x465945, origin: './ntc' },
  { name: 'steel blue', rgb: 0x4682B4, origin: './ntc' },
  { name: 'rustic red', rgb: 0x480404, origin: './ntc' },
  { name: 'bulgarian rose', rgb: 0x480607, origin: './ntc' },
  { name: 'clairvoyant', rgb: 0x480656, origin: './ntc' },
  { name: 'cocoa bean', rgb: 0x481C1C, origin: './ntc' },
  { name: 'woody brown', rgb: 0x483131, origin: './ntc' },
  { name: 'taupe', rgb: 0x483C32, origin: './ntc' },
  { name: 'van cleef', rgb: 0x49170C, origin: './ntc' },
  { name: 'brown derby', rgb: 0x492615, origin: './ntc' },
  { name: 'metallic bronze', rgb: 0x49371B, origin: './ntc' },
  { name: 'verdun green', rgb: 0x495400, origin: './ntc' },
  { name: 'blue bayoux', rgb: 0x496679, origin: './ntc' },
  { name: 'bismark', rgb: 0x497183, origin: './ntc' },
  { name: 'bracken', rgb: 0x4A2A04, origin: './ntc' },
  { name: 'deep bronze', rgb: 0x4A3004, origin: './ntc' },
  { name: 'mondo', rgb: 0x4A3C30, origin: './ntc' },
  { name: 'tundora', rgb: 0x4A4244, origin: './ntc' },
  { name: 'gravel', rgb: 0x4A444B, origin: './ntc' },
  { name: 'trout', rgb: 0x4A4E5A, origin: './ntc' },
  { name: 'pigment indigo', rgb: 0x4B0082, origin: './ntc' },
  { name: 'nandor', rgb: 0x4B5D52, origin: './ntc' },
  { name: 'saddle', rgb: 0x4C3024, origin: './ntc' },
  { name: 'abbey', rgb: 0x4C4F56, origin: './ntc' },
  { name: 'blackberry', rgb: 0x4D0135, origin: './ntc' },
  { name: 'cab sav', rgb: 0x4D0A18, origin: './ntc' },
  { name: 'indian tan', rgb: 0x4D1E01, origin: './ntc' },
  { name: 'cowboy', rgb: 0x4D282D, origin: './ntc' },
  { name: 'livid brown', rgb: 0x4D282E, origin: './ntc' },
  { name: 'rock', rgb: 0x4D3833, origin: './ntc' },
  { name: 'punga', rgb: 0x4D3D14, origin: './ntc' },
  { name: 'bronzetone', rgb: 0x4D400F, origin: './ntc' },
  { name: 'woodland', rgb: 0x4D5328, origin: './ntc' },
  { name: 'mahogany', rgb: 0x4E0606, origin: './ntc' },
  { name: 'bossanova', rgb: 0x4E2A5A, origin: './ntc' },
  { name: 'matterhorn', rgb: 0x4E3B41, origin: './ntc' },
  { name: 'bronze olive', rgb: 0x4E420C, origin: './ntc' },
  { name: 'mulled wine', rgb: 0x4E4562, origin: './ntc' },
  { name: 'axolotl', rgb: 0x4E6649, origin: './ntc' },
  { name: 'wedgewood', rgb: 0x4E7F9E, origin: './ntc' },
  { name: 'shakespeare', rgb: 0x4EABD1, origin: './ntc' },
  { name: 'honey flower', rgb: 0x4F1C70, origin: './ntc' },
  { name: 'daisy bush', rgb: 0x4F2398, origin: './ntc' },
  { name: 'indigo', rgb: 0x4F69C6, origin: './ntc' },
  { name: 'fern green', rgb: 0x4F7942, origin: './ntc' },
  { name: 'fruit salad', rgb: 0x4F9D5D, origin: './ntc' },
  { name: 'apple', rgb: 0x4FA83D, origin: './ntc' },
  { name: 'mortar', rgb: 0x504351, origin: './ntc' },
  { name: 'kashmir blue', rgb: 0x507096, origin: './ntc' },
  { name: 'cutty sark', rgb: 0x507672, origin: './ntc' },
  { name: 'emerald', rgb: 0x50C878, origin: './ntc' },
  { name: 'emperor', rgb: 0x514649, origin: './ntc' },
  { name: 'chalet green', rgb: 0x516E3D, origin: './ntc' },
  { name: 'como', rgb: 0x517C66, origin: './ntc' },
  { name: 'smalt blue', rgb: 0x51808F, origin: './ntc' },
  { name: 'castro', rgb: 0x52001F, origin: './ntc' },
  { name: 'maroon oak', rgb: 0x520C17, origin: './ntc' },
  { name: 'gigas', rgb: 0x523C94, origin: './ntc' },
  { name: 'voodoo', rgb: 0x533455, origin: './ntc' },
  { name: 'victoria', rgb: 0x534491, origin: './ntc' },
  { name: 'hippie green', rgb: 0x53824B, origin: './ntc' },
  { name: 'heath', rgb: 0x541012, origin: './ntc' },
  { name: 'judge gray', rgb: 0x544333, origin: './ntc' },
  { name: 'fuscous gray', rgb: 0x54534D, origin: './ntc' },
  { name: 'vida loca', rgb: 0x549019, origin: './ntc' },
  { name: 'cioccolato', rgb: 0x55280C, origin: './ntc' },
  { name: 'saratoga', rgb: 0x555B10, origin: './ntc' },
  { name: 'finlandia', rgb: 0x556D56, origin: './ntc' },
  { name: 'havelock blue', rgb: 0x5590D9, origin: './ntc' },
  { name: 'fountain blue', rgb: 0x56B4BE, origin: './ntc' },
  { name: 'spring leaves', rgb: 0x578363, origin: './ntc' },
  { name: 'saddle brown', rgb: 0x583401, origin: './ntc' },
  { name: 'scarpa flow', rgb: 0x585562, origin: './ntc' },
  { name: 'cactus', rgb: 0x587156, origin: './ntc' },
  { name: 'hippie blue', rgb: 0x589AAF, origin: './ntc' },
  { name: 'wine berry', rgb: 0x591D35, origin: './ntc' },
  { name: 'brown bramble', rgb: 0x592804, origin: './ntc' },
  { name: 'congo brown', rgb: 0x593737, origin: './ntc' },
  { name: 'millbrook', rgb: 0x594433, origin: './ntc' },
  { name: 'waikawa gray', rgb: 0x5A6E9C, origin: './ntc' },
  { name: 'horizon', rgb: 0x5A87A0, origin: './ntc' },
  { name: 'jambalaya', rgb: 0x5B3013, origin: './ntc' },
  { name: 'bordeaux', rgb: 0x5C0120, origin: './ntc' },
  { name: 'mulberry wood', rgb: 0x5C0536, origin: './ntc' },
  { name: 'carnaby tan', rgb: 0x5C2E01, origin: './ntc' },
  { name: 'comet', rgb: 0x5C5D75, origin: './ntc' },
  { name: 'redwood', rgb: 0x5D1E0F, origin: './ntc' },
  { name: 'don juan', rgb: 0x5D4C51, origin: './ntc' },
  { name: 'chicago', rgb: 0x5D5C58, origin: './ntc' },
  { name: 'verdigris', rgb: 0x5D5E37, origin: './ntc' },
  { name: 'dingley', rgb: 0x5D7747, origin: './ntc' },
  { name: 'breaker bay', rgb: 0x5DA19F, origin: './ntc' },
  { name: 'kabul', rgb: 0x5E483E, origin: './ntc' },
  { name: 'hemlock', rgb: 0x5E5D3B, origin: './ntc' },
  { name: 'irish coffee', rgb: 0x5F3D26, origin: './ntc' },
  { name: 'mid gray', rgb: 0x5F5F6E, origin: './ntc' },
  { name: 'shuttle gray', rgb: 0x5F6672, origin: './ntc' },
  { name: 'aqua forest', rgb: 0x5FA777, origin: './ntc' },
  { name: 'tradewind', rgb: 0x5FB3AC, origin: './ntc' },
  { name: 'horses neck', rgb: 0x604913, origin: './ntc' },
  { name: 'smoky', rgb: 0x605B73, origin: './ntc' },
  { name: 'corduroy', rgb: 0x606E68, origin: './ntc' },
  { name: 'danube', rgb: 0x6093D1, origin: './ntc' },
  { name: 'espresso', rgb: 0x612718, origin: './ntc' },
  { name: 'eggplant', rgb: 0x614051, origin: './ntc' },
  { name: 'costa del sol', rgb: 0x615D30, origin: './ntc' },
  { name: 'glade green', rgb: 0x61845F, origin: './ntc' },
  { name: 'buccaneer', rgb: 0x622F30, origin: './ntc' },
  { name: 'quincy', rgb: 0x623F2D, origin: './ntc' },
  { name: 'butterfly bush', rgb: 0x624E9A, origin: './ntc' },
  { name: 'west coast', rgb: 0x625119, origin: './ntc' },
  { name: 'finch', rgb: 0x626649, origin: './ntc' },
  { name: 'patina', rgb: 0x639A8F, origin: './ntc' },
  { name: 'fern', rgb: 0x63B76C, origin: './ntc' },
  { name: 'blue violet', rgb: 0x6456B7, origin: './ntc' },
  { name: 'dolphin', rgb: 0x646077, origin: './ntc' },
  { name: 'storm dust', rgb: 0x646463, origin: './ntc' },
  { name: 'siam', rgb: 0x646A54, origin: './ntc' },
  { name: 'nevada', rgb: 0x646E75, origin: './ntc' },
  { name: 'cornflower blue', rgb: 0x6495ED, origin: './ntc' },
  { name: 'viking', rgb: 0x64CCDB, origin: './ntc' },
  { name: 'rosewood', rgb: 0x65000B, origin: './ntc' },
  { name: 'cherrywood', rgb: 0x651A14, origin: './ntc' },
  { name: 'purple heart', rgb: 0x652DC1, origin: './ntc' },
  { name: 'fern frond', rgb: 0x657220, origin: './ntc' },
  { name: 'willow grove', rgb: 0x65745D, origin: './ntc' },
  { name: 'hoki', rgb: 0x65869F, origin: './ntc' },
  { name: 'pompadour', rgb: 0x660045, origin: './ntc' },
  { name: 'purple', rgb: 0x660099, origin: './ntc' },
  { name: 'tyrian purple', rgb: 0x66023C, origin: './ntc' },
  { name: 'dark tan', rgb: 0x661010, origin: './ntc' },
  { name: 'silver tree', rgb: 0x66B58F, origin: './ntc' },
  { name: 'bright green', rgb: 0x66FF00, origin: './ntc' },
  { name: "screamin' green", rgb: 0x66FF66, origin: './ntc' },
  { name: 'black rose', rgb: 0x67032D, origin: './ntc' },
  { name: 'scampi', rgb: 0x675FA6, origin: './ntc' },
  { name: 'ironside gray', rgb: 0x676662, origin: './ntc' },
  { name: 'viridian green', rgb: 0x678975, origin: './ntc' },
  { name: 'christi', rgb: 0x67A712, origin: './ntc' },
  { name: 'nutmeg wood finish', rgb: 0x683600, origin: './ntc' },
  { name: 'zambezi', rgb: 0x685558, origin: './ntc' },
  { name: 'salt box', rgb: 0x685E6E, origin: './ntc' },
  { name: 'tawny port', rgb: 0x692545, origin: './ntc' },
  { name: 'finn', rgb: 0x692D54, origin: './ntc' },
  { name: 'scorpion', rgb: 0x695F62, origin: './ntc' },
  { name: 'lynch', rgb: 0x697E9A, origin: './ntc' },
  { name: 'spice', rgb: 0x6A442E, origin: './ntc' },
  { name: 'himalaya', rgb: 0x6A5D1B, origin: './ntc' },
  { name: 'soya bean', rgb: 0x6A6051, origin: './ntc' },
  { name: 'hairy heath', rgb: 0x6B2A14, origin: './ntc' },
  { name: 'royal purple', rgb: 0x6B3FA0, origin: './ntc' },
  { name: 'shingle fawn', rgb: 0x6B4E31, origin: './ntc' },
  { name: 'dorado', rgb: 0x6B5755, origin: './ntc' },
  { name: 'bermuda gray', rgb: 0x6B8BA2, origin: './ntc' },
  { name: 'olive drab', rgb: 0x6B8E23, origin: './ntc' },
  { name: 'eminence', rgb: 0x6C3082, origin: './ntc' },
  { name: 'turquoise blue', rgb: 0x6CDAE7, origin: './ntc' },
  { name: 'lonestar', rgb: 0x6D0101, origin: './ntc' },
  { name: 'pine cone', rgb: 0x6D5E54, origin: './ntc' },
  { name: 'dove gray', rgb: 0x6D6C6C, origin: './ntc' },
  { name: 'juniper', rgb: 0x6D9292, origin: './ntc' },
  { name: 'gothic', rgb: 0x6D92A1, origin: './ntc' },
  { name: 'red oxide', rgb: 0x6E0902, origin: './ntc' },
  { name: 'moccaccino', rgb: 0x6E1D14, origin: './ntc' },
  { name: 'pickled bean', rgb: 0x6E4826, origin: './ntc' },
  { name: 'dallas', rgb: 0x6E4B26, origin: './ntc' },
  { name: 'kokoda', rgb: 0x6E6D57, origin: './ntc' },
  { name: 'pale sky', rgb: 0x6E7783, origin: './ntc' },
  { name: 'cafe royale', rgb: 0x6F440C, origin: './ntc' },
  { name: 'flint', rgb: 0x6F6A61, origin: './ntc' },
  { name: 'highland', rgb: 0x6F8E63, origin: './ntc' },
  { name: 'limeade', rgb: 0x6F9D02, origin: './ntc' },
  { name: 'downy', rgb: 0x6FD0C5, origin: './ntc' },
  { name: 'persian plum', rgb: 0x701C1C, origin: './ntc' },
  { name: 'sepia', rgb: 0x704214, origin: './ntc' },
  { name: 'antique bronze', rgb: 0x704A07, origin: './ntc' },
  { name: 'ferra', rgb: 0x704F50, origin: './ntc' },
  { name: 'coffee', rgb: 0x706555, origin: './ntc' },
  { name: 'slate gray', rgb: 0x708090, origin: './ntc' },
  { name: 'cedar wood finish', rgb: 0x711A00, origin: './ntc' },
  { name: 'metallic copper', rgb: 0x71291D, origin: './ntc' },
  { name: 'affair', rgb: 0x714693, origin: './ntc' },
  { name: 'studio', rgb: 0x714AB2, origin: './ntc' },
  { name: 'tobacco brown', rgb: 0x715D47, origin: './ntc' },
  { name: 'yellow metal', rgb: 0x716338, origin: './ntc' },
  { name: 'peat', rgb: 0x716B56, origin: './ntc' },
  { name: 'olivetone', rgb: 0x716E10, origin: './ntc' },
  { name: 'storm gray', rgb: 0x717486, origin: './ntc' },
  { name: 'sirocco', rgb: 0x718080, origin: './ntc' },
  { name: 'aquamarine blue', rgb: 0x71D9E2, origin: './ntc' },
  { name: 'venetian red', rgb: 0x72010F, origin: './ntc' },
  { name: 'old copper', rgb: 0x724A2F, origin: './ntc' },
  { name: 'go ben', rgb: 0x726D4E, origin: './ntc' },
  { name: 'raven', rgb: 0x727B89, origin: './ntc' },
  { name: 'seance', rgb: 0x731E8F, origin: './ntc' },
  { name: 'raw umber', rgb: 0x734A12, origin: './ntc' },
  { name: 'kimberly', rgb: 0x736C9F, origin: './ntc' },
  { name: 'crocodile', rgb: 0x736D58, origin: './ntc' },
  { name: 'crete', rgb: 0x737829, origin: './ntc' },
  { name: 'xanadu', rgb: 0x738678, origin: './ntc' },
  { name: 'spicy mustard', rgb: 0x74640D, origin: './ntc' },
  { name: 'limed ash', rgb: 0x747D63, origin: './ntc' },
  { name: 'rolling stone', rgb: 0x747D83, origin: './ntc' },
  { name: 'blue smoke', rgb: 0x748881, origin: './ntc' },
  { name: 'laurel', rgb: 0x749378, origin: './ntc' },
  { name: 'mantis', rgb: 0x74C365, origin: './ntc' },
  { name: 'russett', rgb: 0x755A57, origin: './ntc' },
  { name: 'deluge', rgb: 0x7563A8, origin: './ntc' },
  { name: 'cosmic', rgb: 0x76395D, origin: './ntc' },
  { name: 'blue marguerite', rgb: 0x7666C6, origin: './ntc' },
  { name: 'lima', rgb: 0x76BD17, origin: './ntc' },
  { name: 'sky blue', rgb: 0x76D7EA, origin: './ntc' },
  { name: 'dark burgundy', rgb: 0x770F05, origin: './ntc' },
  { name: 'crown of thorns', rgb: 0x771F1F, origin: './ntc' },
  { name: 'walnut', rgb: 0x773F1A, origin: './ntc' },
  { name: 'pablo', rgb: 0x776F61, origin: './ntc' },
  { name: 'pacifika', rgb: 0x778120, origin: './ntc' },
  { name: 'oxley', rgb: 0x779E86, origin: './ntc' },
  { name: 'pastel green', rgb: 0x77DD77, origin: './ntc' },
  { name: 'japanese maple', rgb: 0x780109, origin: './ntc' },
  { name: 'mocha', rgb: 0x782D19, origin: './ntc' },
  { name: 'peanut', rgb: 0x782F16, origin: './ntc' },
  { name: 'camouflage green', rgb: 0x78866B, origin: './ntc' },
  { name: 'wasabi', rgb: 0x788A25, origin: './ntc' },
  { name: 'ship cove', rgb: 0x788BBA, origin: './ntc' },
  { name: 'sea nymph', rgb: 0x78A39C, origin: './ntc' },
  { name: 'roman coffee', rgb: 0x795D4C, origin: './ntc' },
  { name: 'old lavender', rgb: 0x796878, origin: './ntc' },
  { name: 'rum', rgb: 0x796989, origin: './ntc' },
  { name: 'fedora', rgb: 0x796A78, origin: './ntc' },
  { name: 'sandstone', rgb: 0x796D62, origin: './ntc' },
  { name: 'spray', rgb: 0x79DEEC, origin: './ntc' },
  { name: 'siren', rgb: 0x7A013A, origin: './ntc' },
  { name: 'fuchsia blue', rgb: 0x7A58C1, origin: './ntc' },
  { name: 'boulder', rgb: 0x7A7A7A, origin: './ntc' },
  { name: 'wild blue yonder', rgb: 0x7A89B8, origin: './ntc' },
  { name: 'de york', rgb: 0x7AC488, origin: './ntc' },
  { name: 'red beech', rgb: 0x7B3801, origin: './ntc' },
  { name: 'cinnamon', rgb: 0x7B3F00, origin: './ntc' },
  { name: 'yukon gold', rgb: 0x7B6608, origin: './ntc' },
  { name: 'tapa', rgb: 0x7B7874, origin: './ntc' },
  { name: 'waterloo ', rgb: 0x7B7C94, origin: './ntc' },
  { name: 'flax smoke', rgb: 0x7B8265, origin: './ntc' },
  { name: 'amulet', rgb: 0x7B9F80, origin: './ntc' },
  { name: 'asparagus', rgb: 0x7BA05B, origin: './ntc' },
  { name: 'kenyan copper', rgb: 0x7C1C05, origin: './ntc' },
  { name: 'pesto', rgb: 0x7C7631, origin: './ntc' },
  { name: 'topaz', rgb: 0x7C778A, origin: './ntc' },
  { name: 'concord', rgb: 0x7C7B7A, origin: './ntc' },
  { name: 'jumbo', rgb: 0x7C7B82, origin: './ntc' },
  { name: 'trendy green', rgb: 0x7C881A, origin: './ntc' },
  { name: 'gumbo', rgb: 0x7CA1A6, origin: './ntc' },
  { name: 'acapulco', rgb: 0x7CB0A1, origin: './ntc' },
  { name: 'neptune', rgb: 0x7CB7BB, origin: './ntc' },
  { name: 'pueblo', rgb: 0x7D2C14, origin: './ntc' },
  { name: 'bay leaf', rgb: 0x7DA98D, origin: './ntc' },
  { name: 'malibu', rgb: 0x7DC8F7, origin: './ntc' },
  { name: 'bermuda', rgb: 0x7DD8C6, origin: './ntc' },
  { name: 'copper canyon', rgb: 0x7E3A15, origin: './ntc' },
  { name: 'claret', rgb: 0x7F1734, origin: './ntc' },
  { name: 'peru tan', rgb: 0x7F3A02, origin: './ntc' },
  { name: 'falcon', rgb: 0x7F626D, origin: './ntc' },
  { name: 'mobster', rgb: 0x7F7589, origin: './ntc' },
  { name: 'moody blue', rgb: 0x7F76D3, origin: './ntc' },
  { name: 'chartreuse', rgb: 0x7FFF00, origin: './ntc' },
  { name: 'aquamarine', rgb: 0x7FFFD4, origin: './ntc' },
  { name: 'maroon', rgb: 0x800000, origin: './ntc' },
  { name: 'rose bud cherry', rgb: 0x800B47, origin: './ntc' },
  { name: 'falu red', rgb: 0x801818, origin: './ntc' },
  { name: 'red robin', rgb: 0x80341F, origin: './ntc' },
  { name: 'vivid violet', rgb: 0x803790, origin: './ntc' },
  { name: 'russet', rgb: 0x80461B, origin: './ntc' },
  { name: 'friar gray', rgb: 0x807E79, origin: './ntc' },
  { name: 'olive', rgb: 0x808000, origin: './ntc' },
  { name: 'gray', rgb: 0x808080, origin: './ntc' },
  { name: 'gulf stream', rgb: 0x80B3AE, origin: './ntc' },
  { name: 'glacier', rgb: 0x80B3C4, origin: './ntc' },
  { name: 'seagull', rgb: 0x80CCEA, origin: './ntc' },
  { name: 'nutmeg', rgb: 0x81422C, origin: './ntc' },
  { name: 'spicy pink', rgb: 0x816E71, origin: './ntc' },
  { name: 'empress', rgb: 0x817377, origin: './ntc' },
  { name: 'spanish green', rgb: 0x819885, origin: './ntc' },
  { name: 'sand dune', rgb: 0x826F65, origin: './ntc' },
  { name: 'gunsmoke', rgb: 0x828685, origin: './ntc' },
  { name: 'battleship gray', rgb: 0x828F72, origin: './ntc' },
  { name: 'merlot', rgb: 0x831923, origin: './ntc' },
  { name: 'shadow', rgb: 0x837050, origin: './ntc' },
  { name: 'chelsea cucumber', rgb: 0x83AA5D, origin: './ntc' },
  { name: 'monte carlo', rgb: 0x83D0C6, origin: './ntc' },
  { name: 'plum', rgb: 0x843179, origin: './ntc' },
  { name: 'granny smith', rgb: 0x84A0A0, origin: './ntc' },
  { name: 'chetwode blue', rgb: 0x8581D9, origin: './ntc' },
  { name: 'bandicoot', rgb: 0x858470, origin: './ntc' },
  { name: 'bali hai', rgb: 0x859FAF, origin: './ntc' },
  { name: 'half baked', rgb: 0x85C4CC, origin: './ntc' },
  { name: 'red devil', rgb: 0x860111, origin: './ntc' },
  { name: 'lotus', rgb: 0x863C3C, origin: './ntc' },
  { name: 'ironstone', rgb: 0x86483C, origin: './ntc' },
  { name: 'bull shot', rgb: 0x864D1E, origin: './ntc' },
  { name: 'rusty nail', rgb: 0x86560A, origin: './ntc' },
  { name: 'bitter', rgb: 0x868974, origin: './ntc' },
  { name: 'regent gray', rgb: 0x86949F, origin: './ntc' },
  { name: 'disco', rgb: 0x871550, origin: './ntc' },
  { name: 'americano', rgb: 0x87756E, origin: './ntc' },
  { name: 'hurricane', rgb: 0x877C7B, origin: './ntc' },
  { name: 'oslo gray', rgb: 0x878D91, origin: './ntc' },
  { name: 'sushi', rgb: 0x87AB39, origin: './ntc' },
  { name: 'spicy mix', rgb: 0x885342, origin: './ntc' },
  { name: 'kumera', rgb: 0x886221, origin: './ntc' },
  { name: 'suva gray', rgb: 0x888387, origin: './ntc' },
  { name: 'avocado', rgb: 0x888D65, origin: './ntc' },
  { name: 'camelot', rgb: 0x893456, origin: './ntc' },
  { name: 'solid pink', rgb: 0x893843, origin: './ntc' },
  { name: 'cannon pink', rgb: 0x894367, origin: './ntc' },
  { name: 'makara', rgb: 0x897D6D, origin: './ntc' },
  { name: 'burnt umber', rgb: 0x8A3324, origin: './ntc' },
  { name: 'true v', rgb: 0x8A73D6, origin: './ntc' },
  { name: 'clay creek', rgb: 0x8A8360, origin: './ntc' },
  { name: 'monsoon', rgb: 0x8A8389, origin: './ntc' },
  { name: 'stack', rgb: 0x8A8F8A, origin: './ntc' },
  { name: 'jordy blue', rgb: 0x8AB9F1, origin: './ntc' },
  { name: 'electric violet', rgb: 0x8B00FF, origin: './ntc' },
  { name: 'monarch', rgb: 0x8B0723, origin: './ntc' },
  { name: 'corn harvest', rgb: 0x8B6B0B, origin: './ntc' },
  { name: 'olive haze', rgb: 0x8B8470, origin: './ntc' },
  { name: 'schooner', rgb: 0x8B847E, origin: './ntc' },
  { name: 'natural gray', rgb: 0x8B8680, origin: './ntc' },
  { name: 'mantle', rgb: 0x8B9C90, origin: './ntc' },
  { name: 'portage', rgb: 0x8B9FEE, origin: './ntc' },
  { name: 'envy', rgb: 0x8BA690, origin: './ntc' },
  { name: 'cascade', rgb: 0x8BA9A5, origin: './ntc' },
  { name: 'riptide', rgb: 0x8BE6D8, origin: './ntc' },
  { name: 'cardinal pink', rgb: 0x8C055E, origin: './ntc' },
  { name: 'mule fawn', rgb: 0x8C472F, origin: './ntc' },
  { name: 'potters clay', rgb: 0x8C5738, origin: './ntc' },
  { name: 'trendy pink', rgb: 0x8C6495, origin: './ntc' },
  { name: 'paprika', rgb: 0x8D0226, origin: './ntc' },
  { name: 'sanguine brown', rgb: 0x8D3D38, origin: './ntc' },
  { name: 'tosca', rgb: 0x8D3F3F, origin: './ntc' },
  { name: 'cement', rgb: 0x8D7662, origin: './ntc' },
  { name: 'granite green', rgb: 0x8D8974, origin: './ntc' },
  { name: 'manatee', rgb: 0x8D90A1, origin: './ntc' },
  { name: 'polo blue', rgb: 0x8DA8CC, origin: './ntc' },
  { name: 'red berry', rgb: 0x8E0000, origin: './ntc' },
  { name: 'rope', rgb: 0x8E4D1E, origin: './ntc' },
  { name: 'opium', rgb: 0x8E6F70, origin: './ntc' },
  { name: 'domino', rgb: 0x8E775E, origin: './ntc' },
  { name: 'mamba', rgb: 0x8E8190, origin: './ntc' },
  { name: 'nepal', rgb: 0x8EABC1, origin: './ntc' },
  { name: 'pohutukawa', rgb: 0x8F021C, origin: './ntc' },
  { name: 'el salva', rgb: 0x8F3E33, origin: './ntc' },
  { name: 'korma', rgb: 0x8F4B0E, origin: './ntc' },
  { name: 'squirrel', rgb: 0x8F8176, origin: './ntc' },
  { name: 'vista blue', rgb: 0x8FD6B4, origin: './ntc' },
  { name: 'burgundy', rgb: 0x900020, origin: './ntc' },
  { name: 'old brick', rgb: 0x901E1E, origin: './ntc' },
  { name: 'hemp', rgb: 0x907874, origin: './ntc' },
  { name: 'almond frost', rgb: 0x907B71, origin: './ntc' },
  { name: 'sycamore', rgb: 0x908D39, origin: './ntc' },
  { name: 'sangria', rgb: 0x92000A, origin: './ntc' },
  { name: 'cumin', rgb: 0x924321, origin: './ntc' },
  { name: 'beaver', rgb: 0x926F5B, origin: './ntc' },
  { name: 'stonewall', rgb: 0x928573, origin: './ntc' },
  { name: 'venus', rgb: 0x928590, origin: './ntc' },
  { name: 'medium purple', rgb: 0x9370DB, origin: './ntc' },
  { name: 'cornflower', rgb: 0x93CCEA, origin: './ntc' },
  { name: 'algae green', rgb: 0x93DFB8, origin: './ntc' },
  { name: 'copper rust', rgb: 0x944747, origin: './ntc' },
  { name: 'arrowtown', rgb: 0x948771, origin: './ntc' },
  { name: 'scarlett', rgb: 0x950015, origin: './ntc' },
  { name: 'strikemaster', rgb: 0x956387, origin: './ntc' },
  { name: 'mountain mist', rgb: 0x959396, origin: './ntc' },
  { name: 'carmine', rgb: 0x960018, origin: './ntc' },
  { name: 'brown', rgb: 0x964B00, origin: './ntc' },
  { name: 'leather', rgb: 0x967059, origin: './ntc' },
  { name: "purple mountain's majesty", rgb: 0x9678B6, origin: './ntc' },
  { name: 'lavender purple', rgb: 0x967BB6, origin: './ntc' },
  { name: 'pewter', rgb: 0x96A8A1, origin: './ntc' },
  { name: 'summer green', rgb: 0x96BBAB, origin: './ntc' },
  { name: 'au chico', rgb: 0x97605D, origin: './ntc' },
  { name: 'wisteria', rgb: 0x9771B5, origin: './ntc' },
  { name: 'atlantis', rgb: 0x97CD2D, origin: './ntc' },
  { name: 'vin rouge', rgb: 0x983D61, origin: './ntc' },
  { name: 'lilac bush', rgb: 0x9874D3, origin: './ntc' },
  { name: 'bazaar', rgb: 0x98777B, origin: './ntc' },
  { name: 'hacienda', rgb: 0x98811B, origin: './ntc' },
  { name: 'pale oyster', rgb: 0x988D77, origin: './ntc' },
  { name: 'mint green', rgb: 0x98FF98, origin: './ntc' },
  { name: 'fresh eggplant', rgb: 0x990066, origin: './ntc' },
  { name: 'violet eggplant', rgb: 0x991199, origin: './ntc' },
  { name: 'tamarillo', rgb: 0x991613, origin: './ntc' },
  { name: 'totem pole', rgb: 0x991B07, origin: './ntc' },
  { name: 'copper rose', rgb: 0x996666, origin: './ntc' },
  { name: 'amethyst', rgb: 0x9966CC, origin: './ntc' },
  { name: 'mountbatten pink', rgb: 0x997A8D, origin: './ntc' },
  { name: 'blue bell', rgb: 0x9999CC, origin: './ntc' },
  { name: 'prairie sand', rgb: 0x9A3820, origin: './ntc' },
  { name: 'toast', rgb: 0x9A6E61, origin: './ntc' },
  { name: 'gurkha', rgb: 0x9A9577, origin: './ntc' },
  { name: 'olivine', rgb: 0x9AB973, origin: './ntc' },
  { name: 'shadow green', rgb: 0x9AC2B8, origin: './ntc' },
  { name: 'oregon', rgb: 0x9B4703, origin: './ntc' },
  { name: 'lemon grass', rgb: 0x9B9E8F, origin: './ntc' },
  { name: 'stiletto', rgb: 0x9C3336, origin: './ntc' },
  { name: 'hawaiian tan', rgb: 0x9D5616, origin: './ntc' },
  { name: 'gull gray', rgb: 0x9DACB7, origin: './ntc' },
  { name: 'pistachio', rgb: 0x9DC209, origin: './ntc' },
  { name: 'granny smith apple', rgb: 0x9DE093, origin: './ntc' },
  { name: 'anakiwa', rgb: 0x9DE5FF, origin: './ntc' },
  { name: 'chelsea gem', rgb: 0x9E5302, origin: './ntc' },
  { name: 'sepia skin', rgb: 0x9E5B40, origin: './ntc' },
  { name: 'sage', rgb: 0x9EA587, origin: './ntc' },
  { name: 'citron', rgb: 0x9EA91F, origin: './ntc' },
  { name: 'rock blue', rgb: 0x9EB1CD, origin: './ntc' },
  { name: 'morning glory', rgb: 0x9EDEE0, origin: './ntc' },
  { name: 'cognac', rgb: 0x9F381D, origin: './ntc' },
  { name: 'reef gold', rgb: 0x9F821C, origin: './ntc' },
  { name: 'star dust', rgb: 0x9F9F9C, origin: './ntc' },
  { name: 'santas gray', rgb: 0x9FA0B1, origin: './ntc' },
  { name: 'sinbad', rgb: 0x9FD7D3, origin: './ntc' },
  { name: 'feijoa', rgb: 0x9FDD8C, origin: './ntc' },
  { name: 'tabasco', rgb: 0xA02712, origin: './ntc' },
  { name: 'buttered rum', rgb: 0xA1750D, origin: './ntc' },
  { name: 'hit gray', rgb: 0xA1ADB5, origin: './ntc' },
  { name: 'citrus', rgb: 0xA1C50A, origin: './ntc' },
  { name: 'aqua island', rgb: 0xA1DAD7, origin: './ntc' },
  { name: 'water leaf', rgb: 0xA1E9DE, origin: './ntc' },
  { name: 'flirt', rgb: 0xA2006D, origin: './ntc' },
  { name: 'rouge', rgb: 0xA23B6C, origin: './ntc' },
  { name: 'cape palliser', rgb: 0xA26645, origin: './ntc' },
  { name: 'gray chateau', rgb: 0xA2AAB3, origin: './ntc' },
  { name: 'edward', rgb: 0xA2AEAB, origin: './ntc' },
  { name: 'pharlap', rgb: 0xA3807B, origin: './ntc' },
  { name: 'amethyst smoke', rgb: 0xA397B4, origin: './ntc' },
  { name: 'blizzard blue', rgb: 0xA3E3ED, origin: './ntc' },
  { name: 'delta', rgb: 0xA4A49D, origin: './ntc' },
  { name: 'wistful', rgb: 0xA4A6D3, origin: './ntc' },
  { name: 'green smoke', rgb: 0xA4AF6E, origin: './ntc' },
  { name: 'jazzberry jam', rgb: 0xA50B5E, origin: './ntc' },
  { name: 'zorba', rgb: 0xA59B91, origin: './ntc' },
  { name: 'bahia', rgb: 0xA5CB0C, origin: './ntc' },
  { name: 'roof terracotta', rgb: 0xA62F20, origin: './ntc' },
  { name: 'paarl', rgb: 0xA65529, origin: './ntc' },
  { name: 'barley corn', rgb: 0xA68B5B, origin: './ntc' },
  { name: 'donkey brown', rgb: 0xA69279, origin: './ntc' },
  { name: 'dawn', rgb: 0xA6A29A, origin: './ntc' },
  { name: 'mexican red', rgb: 0xA72525, origin: './ntc' },
  { name: 'luxor gold', rgb: 0xA7882C, origin: './ntc' },
  { name: 'rich gold', rgb: 0xA85307, origin: './ntc' },
  { name: 'reno sand', rgb: 0xA86515, origin: './ntc' },
  { name: 'coral tree', rgb: 0xA86B6B, origin: './ntc' },
  { name: 'dusty gray', rgb: 0xA8989B, origin: './ntc' },
  { name: 'dull lavender', rgb: 0xA899E6, origin: './ntc' },
  { name: 'tallow', rgb: 0xA8A589, origin: './ntc' },
  { name: 'bud', rgb: 0xA8AE9C, origin: './ntc' },
  { name: 'locust', rgb: 0xA8AF8E, origin: './ntc' },
  { name: 'norway', rgb: 0xA8BD9F, origin: './ntc' },
  { name: 'chinook', rgb: 0xA8E3BD, origin: './ntc' },
  { name: 'gray olive', rgb: 0xA9A491, origin: './ntc' },
  { name: 'aluminium', rgb: 0xA9ACB6, origin: './ntc' },
  { name: 'cadet blue', rgb: 0xA9B2C3, origin: './ntc' },
  { name: 'schist', rgb: 0xA9B497, origin: './ntc' },
  { name: 'tower gray', rgb: 0xA9BDBF, origin: './ntc' },
  { name: 'perano', rgb: 0xA9BEF2, origin: './ntc' },
  { name: 'opal', rgb: 0xA9C6C2, origin: './ntc' },
  { name: 'night shadz', rgb: 0xAA375A, origin: './ntc' },
  { name: 'fire', rgb: 0xAA4203, origin: './ntc' },
  { name: 'muesli', rgb: 0xAA8B5B, origin: './ntc' },
  { name: 'sandal', rgb: 0xAA8D6F, origin: './ntc' },
  { name: 'shady lady', rgb: 0xAAA5A9, origin: './ntc' },
  { name: 'logan', rgb: 0xAAA9CD, origin: './ntc' },
  { name: 'spun pearl', rgb: 0xAAABB7, origin: './ntc' },
  { name: 'regent st blue', rgb: 0xAAD6E6, origin: './ntc' },
  { name: 'magic mint', rgb: 0xAAF0D1, origin: './ntc' },
  { name: 'lipstick', rgb: 0xAB0563, origin: './ntc' },
  { name: 'royal heath', rgb: 0xAB3472, origin: './ntc' },
  { name: 'sandrift', rgb: 0xAB917A, origin: './ntc' },
  { name: 'cold purple', rgb: 0xABA0D9, origin: './ntc' },
  { name: 'bronco', rgb: 0xABA196, origin: './ntc' },
  { name: 'limed oak', rgb: 0xAC8A56, origin: './ntc' },
  { name: 'east side', rgb: 0xAC91CE, origin: './ntc' },
  { name: 'lemon ginger', rgb: 0xAC9E22, origin: './ntc' },
  { name: 'napa', rgb: 0xACA494, origin: './ntc' },
  { name: 'hillary', rgb: 0xACA586, origin: './ntc' },
  { name: 'cloudy', rgb: 0xACA59F, origin: './ntc' },
  { name: 'silver chalice', rgb: 0xACACAC, origin: './ntc' },
  { name: 'swamp green', rgb: 0xACB78E, origin: './ntc' },
  { name: 'spring rain', rgb: 0xACCBB1, origin: './ntc' },
  { name: 'conifer', rgb: 0xACDD4D, origin: './ntc' },
  { name: 'celadon', rgb: 0xACE1AF, origin: './ntc' },
  { name: 'mandalay', rgb: 0xAD781B, origin: './ntc' },
  { name: 'casper', rgb: 0xADBED1, origin: './ntc' },
  { name: 'moss green', rgb: 0xADDFAD, origin: './ntc' },
  { name: 'padua', rgb: 0xADE6C4, origin: './ntc' },
  { name: 'green yellow', rgb: 0xADFF2F, origin: './ntc' },
  { name: 'hippie pink', rgb: 0xAE4560, origin: './ntc' },
  { name: 'desert', rgb: 0xAE6020, origin: './ntc' },
  { name: 'bouquet', rgb: 0xAE809E, origin: './ntc' },
  { name: 'medium carmine', rgb: 0xAF4035, origin: './ntc' },
  { name: 'apple blossom', rgb: 0xAF4D43, origin: './ntc' },
  { name: 'brown rust', rgb: 0xAF593E, origin: './ntc' },
  { name: 'driftwood', rgb: 0xAF8751, origin: './ntc' },
  { name: 'alpine', rgb: 0xAF8F2C, origin: './ntc' },
  { name: 'lucky', rgb: 0xAF9F1C, origin: './ntc' },
  { name: 'martini', rgb: 0xAFA09E, origin: './ntc' },
  { name: 'bombay', rgb: 0xAFB1B8, origin: './ntc' },
  { name: 'pigeon post', rgb: 0xAFBDD9, origin: './ntc' },
  { name: 'cadillac', rgb: 0xB04C6A, origin: './ntc' },
  { name: 'matrix', rgb: 0xB05D54, origin: './ntc' },
  { name: 'tapestry', rgb: 0xB05E81, origin: './ntc' },
  { name: 'mai tai', rgb: 0xB06608, origin: './ntc' },
  { name: 'del rio', rgb: 0xB09A95, origin: './ntc' },
  { name: 'powder blue', rgb: 0xB0E0E6, origin: './ntc' },
  { name: 'inch worm', rgb: 0xB0E313, origin: './ntc' },
  { name: 'bright red', rgb: 0xB10000, origin: './ntc' },
  { name: 'vesuvius', rgb: 0xB14A0B, origin: './ntc' },
  { name: 'pumpkin skin', rgb: 0xB1610B, origin: './ntc' },
  { name: 'santa fe', rgb: 0xB16D52, origin: './ntc' },
  { name: 'teak', rgb: 0xB19461, origin: './ntc' },
  { name: 'fringy flower', rgb: 0xB1E2C1, origin: './ntc' },
  { name: 'ice cold', rgb: 0xB1F4E7, origin: './ntc' },
  { name: 'shiraz', rgb: 0xB20931, origin: './ntc' },
  { name: 'biloba flower', rgb: 0xB2A1EA, origin: './ntc' },
  { name: 'tall poppy', rgb: 0xB32D29, origin: './ntc' },
  { name: 'fiery orange', rgb: 0xB35213, origin: './ntc' },
  { name: 'hot toddy', rgb: 0xB38007, origin: './ntc' },
  { name: 'taupe gray', rgb: 0xB3AF95, origin: './ntc' },
  { name: 'la rioja', rgb: 0xB3C110, origin: './ntc' },
  { name: 'well read', rgb: 0xB43332, origin: './ntc' },
  { name: 'blush', rgb: 0xB44668, origin: './ntc' },
  { name: 'jungle mist', rgb: 0xB4CFD3, origin: './ntc' },
  { name: 'turkish rose', rgb: 0xB57281, origin: './ntc' },
  { name: 'lavender', rgb: 0xB57EDC, origin: './ntc' },
  { name: 'mongoose', rgb: 0xB5A27F, origin: './ntc' },
  { name: 'olive green', rgb: 0xB5B35C, origin: './ntc' },
  { name: 'jet stream', rgb: 0xB5D2CE, origin: './ntc' },
  { name: 'cruise', rgb: 0xB5ECDF, origin: './ntc' },
  { name: 'hibiscus', rgb: 0xB6316C, origin: './ntc' },
  { name: 'thatch', rgb: 0xB69D98, origin: './ntc' },
  { name: 'heathered gray', rgb: 0xB6B095, origin: './ntc' },
  { name: 'eagle', rgb: 0xB6BAA4, origin: './ntc' },
  { name: 'spindle', rgb: 0xB6D1EA, origin: './ntc' },
  { name: 'gum leaf', rgb: 0xB6D3BF, origin: './ntc' },
  { name: 'rust', rgb: 0xB7410E, origin: './ntc' },
  { name: 'muddy waters', rgb: 0xB78E5C, origin: './ntc' },
  { name: 'sahara', rgb: 0xB7A214, origin: './ntc' },
  { name: 'husk', rgb: 0xB7A458, origin: './ntc' },
  { name: 'nobel', rgb: 0xB7B1B1, origin: './ntc' },
  { name: 'heather', rgb: 0xB7C3D0, origin: './ntc' },
  { name: 'madang', rgb: 0xB7F0BE, origin: './ntc' },
  { name: 'milano red', rgb: 0xB81104, origin: './ntc' },
  { name: 'copper', rgb: 0xB87333, origin: './ntc' },
  { name: 'gimblet', rgb: 0xB8B56A, origin: './ntc' },
  { name: 'green spring', rgb: 0xB8C1B1, origin: './ntc' },
  { name: 'celery', rgb: 0xB8C25D, origin: './ntc' },
  { name: 'sail', rgb: 0xB8E0F9, origin: './ntc' },
  { name: 'chestnut', rgb: 0xB94E48, origin: './ntc' },
  { name: 'crail', rgb: 0xB95140, origin: './ntc' },
  { name: 'marigold', rgb: 0xB98D28, origin: './ntc' },
  { name: 'wild willow', rgb: 0xB9C46A, origin: './ntc' },
  { name: 'rainee', rgb: 0xB9C8AC, origin: './ntc' },
  { name: 'guardsman red', rgb: 0xBA0101, origin: './ntc' },
  { name: 'rock spray', rgb: 0xBA450C, origin: './ntc' },
  { name: 'bourbon', rgb: 0xBA6F1E, origin: './ntc' },
  { name: 'pirate gold', rgb: 0xBA7F03, origin: './ntc' },
  { name: 'nomad', rgb: 0xBAB1A2, origin: './ntc' },
  { name: 'submarine', rgb: 0xBAC7C9, origin: './ntc' },
  { name: 'charlotte', rgb: 0xBAEEF9, origin: './ntc' },
  { name: 'medium red violet', rgb: 0xBB3385, origin: './ntc' },
  { name: 'brandy rose', rgb: 0xBB8983, origin: './ntc' },
  { name: 'rio grande', rgb: 0xBBD009, origin: './ntc' },
  { name: 'surf', rgb: 0xBBD7C1, origin: './ntc' },
  { name: 'powder ash', rgb: 0xBCC9C2, origin: './ntc' },
  { name: 'tuscany', rgb: 0xBD5E2E, origin: './ntc' },
  { name: 'quicksand', rgb: 0xBD978E, origin: './ntc' },
  { name: 'silk', rgb: 0xBDB1A8, origin: './ntc' },
  { name: 'malta', rgb: 0xBDB2A1, origin: './ntc' },
  { name: 'chatelle', rgb: 0xBDB3C7, origin: './ntc' },
  { name: 'lavender gray', rgb: 0xBDBBD7, origin: './ntc' },
  { name: 'french gray', rgb: 0xBDBDC6, origin: './ntc' },
  { name: 'clay ash', rgb: 0xBDC8B3, origin: './ntc' },
  { name: 'loblolly', rgb: 0xBDC9CE, origin: './ntc' },
  { name: 'french pass', rgb: 0xBDEDFD, origin: './ntc' },
  { name: 'london hue', rgb: 0xBEA6C3, origin: './ntc' },
  { name: 'pink swan', rgb: 0xBEB5B7, origin: './ntc' },
  { name: 'fuego', rgb: 0xBEDE0D, origin: './ntc' },
  { name: 'rose of sharon', rgb: 0xBF5500, origin: './ntc' },
  { name: 'tide', rgb: 0xBFB8B0, origin: './ntc' },
  { name: 'blue haze', rgb: 0xBFBED8, origin: './ntc' },
  { name: 'silver sand', rgb: 0xBFC1C2, origin: './ntc' },
  { name: 'key lime pie', rgb: 0xBFC921, origin: './ntc' },
  { name: 'ziggurat', rgb: 0xBFDBE2, origin: './ntc' },
  { name: 'lime', rgb: 0xBFFF00, origin: './ntc' },
  { name: 'thunderbird', rgb: 0xC02B18, origin: './ntc' },
  { name: 'mojo', rgb: 0xC04737, origin: './ntc' },
  { name: 'old rose', rgb: 0xC08081, origin: './ntc' },
  { name: 'silver', rgb: 0xC0C0C0, origin: './ntc' },
  { name: 'pale leaf', rgb: 0xC0D3B9, origin: './ntc' },
  { name: 'pixie green', rgb: 0xC0D8B6, origin: './ntc' },
  { name: 'tia maria', rgb: 0xC1440E, origin: './ntc' },
  { name: 'fuchsia pink', rgb: 0xC154C1, origin: './ntc' },
  { name: 'buddha gold', rgb: 0xC1A004, origin: './ntc' },
  { name: 'bison hide', rgb: 0xC1B7A4, origin: './ntc' },
  { name: 'tea', rgb: 0xC1BAB0, origin: './ntc' },
  { name: 'gray suit', rgb: 0xC1BECD, origin: './ntc' },
  { name: 'sprout', rgb: 0xC1D7B0, origin: './ntc' },
  { name: 'sulu', rgb: 0xC1F07C, origin: './ntc' },
  { name: 'indochine', rgb: 0xC26B03, origin: './ntc' },
  { name: 'twine', rgb: 0xC2955D, origin: './ntc' },
  { name: 'cotton seed', rgb: 0xC2BDB6, origin: './ntc' },
  { name: 'pumice', rgb: 0xC2CAC4, origin: './ntc' },
  { name: 'jagged ice', rgb: 0xC2E8E5, origin: './ntc' },
  { name: 'maroon flush', rgb: 0xC32148, origin: './ntc' },
  { name: 'indian khaki', rgb: 0xC3B091, origin: './ntc' },
  { name: 'pale slate', rgb: 0xC3BFC1, origin: './ntc' },
  { name: 'gray nickel', rgb: 0xC3C3BD, origin: './ntc' },
  { name: 'periwinkle gray', rgb: 0xC3CDE6, origin: './ntc' },
  { name: 'tiara', rgb: 0xC3D1D1, origin: './ntc' },
  { name: 'tropical blue', rgb: 0xC3DDF9, origin: './ntc' },
  { name: 'cardinal', rgb: 0xC41E3A, origin: './ntc' },
  { name: 'fuzzy wuzzy brown', rgb: 0xC45655, origin: './ntc' },
  { name: 'orange roughy', rgb: 0xC45719, origin: './ntc' },
  { name: 'mist gray', rgb: 0xC4C4BC, origin: './ntc' },
  { name: 'coriander', rgb: 0xC4D0B0, origin: './ntc' },
  { name: 'mint tulip', rgb: 0xC4F4EB, origin: './ntc' },
  { name: 'mulberry', rgb: 0xC54B8C, origin: './ntc' },
  { name: 'nugget', rgb: 0xC59922, origin: './ntc' },
  { name: 'tussock', rgb: 0xC5994B, origin: './ntc' },
  { name: 'sea mist', rgb: 0xC5DBCA, origin: './ntc' },
  { name: 'yellow green', rgb: 0xC5E17A, origin: './ntc' },
  { name: 'brick red', rgb: 0xC62D42, origin: './ntc' },
  { name: 'contessa', rgb: 0xC6726B, origin: './ntc' },
  { name: 'oriental pink', rgb: 0xC69191, origin: './ntc' },
  { name: 'roti', rgb: 0xC6A84B, origin: './ntc' },
  { name: 'ash', rgb: 0xC6C3B5, origin: './ntc' },
  { name: 'kangaroo', rgb: 0xC6C8BD, origin: './ntc' },
  { name: 'las palmas', rgb: 0xC6E610, origin: './ntc' },
  { name: 'monza', rgb: 0xC7031E, origin: './ntc' },
  { name: 'red violet', rgb: 0xC71585, origin: './ntc' },
  { name: 'coral reef', rgb: 0xC7BCA2, origin: './ntc' },
  { name: 'melrose', rgb: 0xC7C1FF, origin: './ntc' },
  { name: 'cloud', rgb: 0xC7C4BF, origin: './ntc' },
  { name: 'ghost', rgb: 0xC7C9D5, origin: './ntc' },
  { name: 'pine glade', rgb: 0xC7CD90, origin: './ntc' },
  { name: 'botticelli', rgb: 0xC7DDE5, origin: './ntc' },
  { name: 'antique brass', rgb: 0xC88A65, origin: './ntc' },
  { name: 'lilac', rgb: 0xC8A2C8, origin: './ntc' },
  { name: 'hokey pokey', rgb: 0xC8A528, origin: './ntc' },
  { name: 'lily', rgb: 0xC8AABF, origin: './ntc' },
  { name: 'laser', rgb: 0xC8B568, origin: './ntc' },
  { name: 'edgewater', rgb: 0xC8E3D7, origin: './ntc' },
  { name: 'piper', rgb: 0xC96323, origin: './ntc' },
  { name: 'pizza', rgb: 0xC99415, origin: './ntc' },
  { name: 'light wisteria', rgb: 0xC9A0DC, origin: './ntc' },
  { name: 'rodeo dust', rgb: 0xC9B29B, origin: './ntc' },
  { name: 'sundance', rgb: 0xC9B35B, origin: './ntc' },
  { name: 'earls green', rgb: 0xC9B93B, origin: './ntc' },
  { name: 'silver rust', rgb: 0xC9C0BB, origin: './ntc' },
  { name: 'conch', rgb: 0xC9D9D2, origin: './ntc' },
  { name: 'reef', rgb: 0xC9FFA2, origin: './ntc' },
  { name: 'aero blue', rgb: 0xC9FFE5, origin: './ntc' },
  { name: 'flush mahogany', rgb: 0xCA3435, origin: './ntc' },
  { name: 'turmeric', rgb: 0xCABB48, origin: './ntc' },
  { name: 'paris white', rgb: 0xCADCD4, origin: './ntc' },
  { name: 'bitter lemon', rgb: 0xCAE00D, origin: './ntc' },
  { name: 'skeptic', rgb: 0xCAE6DA, origin: './ntc' },
  { name: 'viola', rgb: 0xCB8FA9, origin: './ntc' },
  { name: 'foggy gray', rgb: 0xCBCAB6, origin: './ntc' },
  { name: 'green mist', rgb: 0xCBD3B0, origin: './ntc' },
  { name: 'nebula', rgb: 0xCBDBD6, origin: './ntc' },
  { name: 'persian red', rgb: 0xCC3333, origin: './ntc' },
  { name: 'burnt orange', rgb: 0xCC5500, origin: './ntc' },
  { name: 'ochre', rgb: 0xCC7722, origin: './ntc' },
  { name: 'puce', rgb: 0xCC8899, origin: './ntc' },
  { name: 'thistle green', rgb: 0xCCCAA8, origin: './ntc' },
  { name: 'periwinkle', rgb: 0xCCCCFF, origin: './ntc' },
  { name: 'electric lime', rgb: 0xCCFF00, origin: './ntc' },
  { name: 'tenn', rgb: 0xCD5700, origin: './ntc' },
  { name: 'chestnut rose', rgb: 0xCD5C5C, origin: './ntc' },
  { name: 'brandy punch', rgb: 0xCD8429, origin: './ntc' },
  { name: 'onahau', rgb: 0xCDF4FF, origin: './ntc' },
  { name: 'sorrell brown', rgb: 0xCEB98F, origin: './ntc' },
  { name: 'cold turkey', rgb: 0xCEBABA, origin: './ntc' },
  { name: 'yuma', rgb: 0xCEC291, origin: './ntc' },
  { name: 'chino', rgb: 0xCEC7A7, origin: './ntc' },
  { name: 'eunry', rgb: 0xCFA39D, origin: './ntc' },
  { name: 'old gold', rgb: 0xCFB53B, origin: './ntc' },
  { name: 'tasman', rgb: 0xCFDCCF, origin: './ntc' },
  { name: 'surf crest', rgb: 0xCFE5D2, origin: './ntc' },
  { name: 'humming bird', rgb: 0xCFF9F3, origin: './ntc' },
  { name: 'scandal', rgb: 0xCFFAF4, origin: './ntc' },
  { name: 'red stage', rgb: 0xD05F04, origin: './ntc' },
  { name: 'hopbush', rgb: 0xD06DA1, origin: './ntc' },
  { name: 'meteor', rgb: 0xD07D12, origin: './ntc' },
  { name: 'perfume', rgb: 0xD0BEF8, origin: './ntc' },
  { name: 'prelude', rgb: 0xD0C0E5, origin: './ntc' },
  { name: 'tea green', rgb: 0xD0F0C0, origin: './ntc' },
  { name: 'geebung', rgb: 0xD18F1B, origin: './ntc' },
  { name: 'vanilla', rgb: 0xD1BEA8, origin: './ntc' },
  { name: 'soft amber', rgb: 0xD1C6B4, origin: './ntc' },
  { name: 'celeste', rgb: 0xD1D2CA, origin: './ntc' },
  { name: 'mischka', rgb: 0xD1D2DD, origin: './ntc' },
  { name: 'pear', rgb: 0xD1E231, origin: './ntc' },
  { name: 'hot cinnamon', rgb: 0xD2691E, origin: './ntc' },
  { name: 'raw sienna', rgb: 0xD27D46, origin: './ntc' },
  { name: 'careys pink', rgb: 0xD29EAA, origin: './ntc' },
  { name: 'tan', rgb: 0xD2B48C, origin: './ntc' },
  { name: 'deco', rgb: 0xD2DA97, origin: './ntc' },
  { name: 'blue romance', rgb: 0xD2F6DE, origin: './ntc' },
  { name: 'gossip', rgb: 0xD2F8B0, origin: './ntc' },
  { name: 'sisal', rgb: 0xD3CBBA, origin: './ntc' },
  { name: 'swirl', rgb: 0xD3CDC5, origin: './ntc' },
  { name: 'charm', rgb: 0xD47494, origin: './ntc' },
  { name: 'clam shell', rgb: 0xD4B6AF, origin: './ntc' },
  { name: 'straw', rgb: 0xD4BF8D, origin: './ntc' },
  { name: 'akaroa', rgb: 0xD4C4A8, origin: './ntc' },
  { name: 'bird flower', rgb: 0xD4CD16, origin: './ntc' },
  { name: 'iron', rgb: 0xD4D7D9, origin: './ntc' },
  { name: 'geyser', rgb: 0xD4DFE2, origin: './ntc' },
  { name: 'hawkes blue', rgb: 0xD4E2FC, origin: './ntc' },
  { name: 'grenadier', rgb: 0xD54600, origin: './ntc' },
  { name: 'can can', rgb: 0xD591A4, origin: './ntc' },
  { name: 'whiskey', rgb: 0xD59A6F, origin: './ntc' },
  { name: 'winter hazel', rgb: 0xD5D195, origin: './ntc' },
  { name: 'granny apple', rgb: 0xD5F6E3, origin: './ntc' },
  { name: 'my pink', rgb: 0xD69188, origin: './ntc' },
  { name: 'tacha', rgb: 0xD6C562, origin: './ntc' },
  { name: 'moon raker', rgb: 0xD6CEF6, origin: './ntc' },
  { name: 'quill gray', rgb: 0xD6D6D1, origin: './ntc' },
  { name: 'snowy mint', rgb: 0xD6FFDB, origin: './ntc' },
  { name: 'new york pink', rgb: 0xD7837F, origin: './ntc' },
  { name: 'pavlova', rgb: 0xD7C498, origin: './ntc' },
  { name: 'fog', rgb: 0xD7D0FF, origin: './ntc' },
  { name: 'valencia', rgb: 0xD84437, origin: './ntc' },
  { name: 'japonica', rgb: 0xD87C63, origin: './ntc' },
  { name: 'thistle', rgb: 0xD8BFD8, origin: './ntc' },
  { name: 'maverick', rgb: 0xD8C2D5, origin: './ntc' },
  { name: 'foam', rgb: 0xD8FCFA, origin: './ntc' },
  { name: 'cabaret', rgb: 0xD94972, origin: './ntc' },
  { name: 'burning sand', rgb: 0xD99376, origin: './ntc' },
  { name: 'cameo', rgb: 0xD9B99B, origin: './ntc' },
  { name: 'timberwolf', rgb: 0xD9D6CF, origin: './ntc' },
  { name: 'tana', rgb: 0xD9DCC1, origin: './ntc' },
  { name: 'link water', rgb: 0xD9E4F5, origin: './ntc' },
  { name: 'mabel', rgb: 0xD9F7FF, origin: './ntc' },
  { name: 'cerise', rgb: 0xDA3287, origin: './ntc' },
  { name: 'flame pea', rgb: 0xDA5B38, origin: './ntc' },
  { name: 'bamboo', rgb: 0xDA6304, origin: './ntc' },
  { name: 'red damask', rgb: 0xDA6A41, origin: './ntc' },
  { name: 'orchid', rgb: 0xDA70D6, origin: './ntc' },
  { name: 'copperfield', rgb: 0xDA8A67, origin: './ntc' },
  { name: 'golden grass', rgb: 0xDAA520, origin: './ntc' },
  { name: 'zanah', rgb: 0xDAECD6, origin: './ntc' },
  { name: 'iceberg', rgb: 0xDAF4F0, origin: './ntc' },
  { name: 'oyster bay', rgb: 0xDAFAFF, origin: './ntc' },
  { name: 'cranberry', rgb: 0xDB5079, origin: './ntc' },
  { name: 'petite orchid', rgb: 0xDB9690, origin: './ntc' },
  { name: 'di serria', rgb: 0xDB995E, origin: './ntc' },
  { name: 'alto', rgb: 0xDBDBDB, origin: './ntc' },
  { name: 'frosted mint', rgb: 0xDBFFF8, origin: './ntc' },
  { name: 'crimson', rgb: 0xDC143C, origin: './ntc' },
  { name: 'punch', rgb: 0xDC4333, origin: './ntc' },
  { name: 'galliano', rgb: 0xDCB20C, origin: './ntc' },
  { name: 'blossom', rgb: 0xDCB4BC, origin: './ntc' },
  { name: 'wattle', rgb: 0xDCD747, origin: './ntc' },
  { name: 'westar', rgb: 0xDCD9D2, origin: './ntc' },
  { name: 'moon mist', rgb: 0xDCDDCC, origin: './ntc' },
  { name: 'caper', rgb: 0xDCEDB4, origin: './ntc' },
  { name: 'swans down', rgb: 0xDCF0EA, origin: './ntc' },
  { name: 'swiss coffee', rgb: 0xDDD6D5, origin: './ntc' },
  { name: 'white ice', rgb: 0xDDF9F1, origin: './ntc' },
  { name: 'cerise red', rgb: 0xDE3163, origin: './ntc' },
  { name: 'roman', rgb: 0xDE6360, origin: './ntc' },
  { name: 'tumbleweed', rgb: 0xDEA681, origin: './ntc' },
  { name: 'gold tips', rgb: 0xDEBA13, origin: './ntc' },
  { name: 'brandy', rgb: 0xDEC196, origin: './ntc' },
  { name: 'wafer', rgb: 0xDECBC6, origin: './ntc' },
  { name: 'sapling', rgb: 0xDED4A4, origin: './ntc' },
  { name: 'barberry', rgb: 0xDED717, origin: './ntc' },
  { name: 'beryl green', rgb: 0xDEE5C0, origin: './ntc' },
  { name: 'pattens blue', rgb: 0xDEF5FF, origin: './ntc' },
  { name: 'heliotrope', rgb: 0xDF73FF, origin: './ntc' },
  { name: 'apache', rgb: 0xDFBE6F, origin: './ntc' },
  { name: 'chenin', rgb: 0xDFCD6F, origin: './ntc' },
  { name: 'lola', rgb: 0xDFCFDB, origin: './ntc' },
  { name: 'willow brook', rgb: 0xDFECDA, origin: './ntc' },
  { name: 'chartreuse yellow', rgb: 0xDFFF00, origin: './ntc' },
  { name: 'mauve', rgb: 0xE0B0FF, origin: './ntc' },
  { name: 'anzac', rgb: 0xE0B646, origin: './ntc' },
  { name: 'harvest gold', rgb: 0xE0B974, origin: './ntc' },
  { name: 'calico', rgb: 0xE0C095, origin: './ntc' },
  { name: 'baby blue', rgb: 0xE0FFFF, origin: './ntc' },
  { name: 'sunglo', rgb: 0xE16865, origin: './ntc' },
  { name: 'equator', rgb: 0xE1BC64, origin: './ntc' },
  { name: 'pink flare', rgb: 0xE1C0C8, origin: './ntc' },
  { name: 'periglacial blue', rgb: 0xE1E6D6, origin: './ntc' },
  { name: 'kidnapper', rgb: 0xE1EAD4, origin: './ntc' },
  { name: 'tara', rgb: 0xE1F6E8, origin: './ntc' },
  { name: 'mandy', rgb: 0xE25465, origin: './ntc' },
  { name: 'terracotta', rgb: 0xE2725B, origin: './ntc' },
  { name: 'golden bell', rgb: 0xE28913, origin: './ntc' },
  { name: 'shocking', rgb: 0xE292C0, origin: './ntc' },
  { name: 'dixie', rgb: 0xE29418, origin: './ntc' },
  { name: 'light orchid', rgb: 0xE29CD2, origin: './ntc' },
  { name: 'snuff', rgb: 0xE2D8ED, origin: './ntc' },
  { name: 'mystic', rgb: 0xE2EBED, origin: './ntc' },
  { name: 'apple green', rgb: 0xE2F3EC, origin: './ntc' },
  { name: 'razzmatazz', rgb: 0xE30B5C, origin: './ntc' },
  { name: 'alizarin crimson', rgb: 0xE32636, origin: './ntc' },
  { name: 'cinnabar', rgb: 0xE34234, origin: './ntc' },
  { name: 'cavern pink', rgb: 0xE3BEBE, origin: './ntc' },
  { name: 'peppermint', rgb: 0xE3F5E1, origin: './ntc' },
  { name: 'mindaro', rgb: 0xE3F988, origin: './ntc' },
  { name: 'deep blush', rgb: 0xE47698, origin: './ntc' },
  { name: 'gamboge', rgb: 0xE49B0F, origin: './ntc' },
  { name: 'melanie', rgb: 0xE4C2D5, origin: './ntc' },
  { name: 'twilight', rgb: 0xE4CFDE, origin: './ntc' },
  { name: 'bone', rgb: 0xE4D1C0, origin: './ntc' },
  { name: 'sunflower', rgb: 0xE4D422, origin: './ntc' },
  { name: 'grain brown', rgb: 0xE4D5B7, origin: './ntc' },
  { name: 'zombie', rgb: 0xE4D69B, origin: './ntc' },
  { name: 'frostee', rgb: 0xE4F6E7, origin: './ntc' },
  { name: 'snow flurry', rgb: 0xE4FFD1, origin: './ntc' },
  { name: 'amaranth', rgb: 0xE52B50, origin: './ntc' },
  { name: 'zest', rgb: 0xE5841B, origin: './ntc' },
  { name: 'dust storm', rgb: 0xE5CCC9, origin: './ntc' },
  { name: 'stark white', rgb: 0xE5D7BD, origin: './ntc' },
  { name: 'hampton', rgb: 0xE5D8AF, origin: './ntc' },
  { name: 'bon jour', rgb: 0xE5E0E1, origin: './ntc' },
  { name: 'mercury', rgb: 0xE5E5E5, origin: './ntc' },
  { name: 'polar', rgb: 0xE5F9F6, origin: './ntc' },
  { name: 'trinidad', rgb: 0xE64E03, origin: './ntc' },
  { name: 'gold sand', rgb: 0xE6BE8A, origin: './ntc' },
  { name: 'cashmere', rgb: 0xE6BEA5, origin: './ntc' },
  { name: 'double spanish white', rgb: 0xE6D7B9, origin: './ntc' },
  { name: 'satin linen', rgb: 0xE6E4D4, origin: './ntc' },
  { name: 'harp', rgb: 0xE6F2EA, origin: './ntc' },
  { name: 'off green', rgb: 0xE6F8F3, origin: './ntc' },
  { name: 'hint of green', rgb: 0xE6FFE9, origin: './ntc' },
  { name: 'tranquil', rgb: 0xE6FFFF, origin: './ntc' },
  { name: 'mango tango', rgb: 0xE77200, origin: './ntc' },
  { name: 'christine', rgb: 0xE7730A, origin: './ntc' },
  { name: 'tonys pink', rgb: 0xE79F8C, origin: './ntc' },
  { name: 'kobi', rgb: 0xE79FC4, origin: './ntc' },
  { name: 'rose fog', rgb: 0xE7BCB4, origin: './ntc' },
  { name: 'corn', rgb: 0xE7BF05, origin: './ntc' },
  { name: 'putty', rgb: 0xE7CD8C, origin: './ntc' },
  { name: 'gray nurse', rgb: 0xE7ECE6, origin: './ntc' },
  { name: 'lily white', rgb: 0xE7F8FF, origin: './ntc' },
  { name: 'bubbles', rgb: 0xE7FEFF, origin: './ntc' },
  { name: 'fire bush', rgb: 0xE89928, origin: './ntc' },
  { name: 'shilo', rgb: 0xE8B9B3, origin: './ntc' },
  { name: 'pearl bush', rgb: 0xE8E0D5, origin: './ntc' },
  { name: 'green white', rgb: 0xE8EBE0, origin: './ntc' },
  { name: 'chrome white', rgb: 0xE8F1D4, origin: './ntc' },
  { name: 'gin', rgb: 0xE8F2EB, origin: './ntc' },
  { name: 'aqua squeeze', rgb: 0xE8F5F2, origin: './ntc' },
  { name: 'clementine', rgb: 0xE96E00, origin: './ntc' },
  { name: 'burnt sienna', rgb: 0xE97451, origin: './ntc' },
  { name: 'tahiti gold', rgb: 0xE97C07, origin: './ntc' },
  { name: 'oyster pink', rgb: 0xE9CECD, origin: './ntc' },
  { name: 'confetti', rgb: 0xE9D75A, origin: './ntc' },
  { name: 'ebb', rgb: 0xE9E3E3, origin: './ntc' },
  { name: 'ottoman', rgb: 0xE9F8ED, origin: './ntc' },
  { name: 'clear day', rgb: 0xE9FFFD, origin: './ntc' },
  { name: 'carissma', rgb: 0xEA88A8, origin: './ntc' },
  { name: 'porsche', rgb: 0xEAAE69, origin: './ntc' },
  { name: 'tulip tree', rgb: 0xEAB33B, origin: './ntc' },
  { name: 'rob roy', rgb: 0xEAC674, origin: './ntc' },
  { name: 'raffia', rgb: 0xEADAB8, origin: './ntc' },
  { name: 'white rock', rgb: 0xEAE8D4, origin: './ntc' },
  { name: 'panache', rgb: 0xEAF6EE, origin: './ntc' },
  { name: 'solitude', rgb: 0xEAF6FF, origin: './ntc' },
  { name: 'aqua spring', rgb: 0xEAF9F5, origin: './ntc' },
  { name: 'dew', rgb: 0xEAFFFE, origin: './ntc' },
  { name: 'apricot', rgb: 0xEB9373, origin: './ntc' },
  { name: 'zinnwaldite', rgb: 0xEBC2AF, origin: './ntc' },
  { name: 'fuel yellow', rgb: 0xECA927, origin: './ntc' },
  { name: 'ronchi', rgb: 0xECC54E, origin: './ntc' },
  { name: 'french lilac', rgb: 0xECC7EE, origin: './ntc' },
  { name: 'just right', rgb: 0xECCDB9, origin: './ntc' },
  { name: 'wild rice', rgb: 0xECE090, origin: './ntc' },
  { name: 'fall green', rgb: 0xECEBBD, origin: './ntc' },
  { name: 'aths special', rgb: 0xECEBCE, origin: './ntc' },
  { name: 'starship', rgb: 0xECF245, origin: './ntc' },
  { name: 'red ribbon', rgb: 0xED0A3F, origin: './ntc' },
  { name: 'tango', rgb: 0xED7A1C, origin: './ntc' },
  { name: 'carrot orange', rgb: 0xED9121, origin: './ntc' },
  { name: 'sea pink', rgb: 0xED989E, origin: './ntc' },
  { name: 'tacao', rgb: 0xEDB381, origin: './ntc' },
  { name: 'desert sand', rgb: 0xEDC9AF, origin: './ntc' },
  { name: 'pancho', rgb: 0xEDCDAB, origin: './ntc' },
  { name: 'chamois', rgb: 0xEDDCB1, origin: './ntc' },
  { name: 'primrose', rgb: 0xEDEA99, origin: './ntc' },
  { name: 'frost', rgb: 0xEDF5DD, origin: './ntc' },
  { name: 'aqua haze', rgb: 0xEDF5F5, origin: './ntc' },
  { name: 'zumthor', rgb: 0xEDF6FF, origin: './ntc' },
  { name: 'narvik', rgb: 0xEDF9F1, origin: './ntc' },
  { name: 'honeysuckle', rgb: 0xEDFC84, origin: './ntc' },
  { name: 'lavender magenta', rgb: 0xEE82EE, origin: './ntc' },
  { name: 'beauty bush', rgb: 0xEEC1BE, origin: './ntc' },
  { name: 'chalky', rgb: 0xEED794, origin: './ntc' },
  { name: 'almond', rgb: 0xEED9C4, origin: './ntc' },
  { name: 'flax', rgb: 0xEEDC82, origin: './ntc' },
  { name: 'bizarre', rgb: 0xEEDEDA, origin: './ntc' },
  { name: 'double colonial white', rgb: 0xEEE3AD, origin: './ntc' },
  { name: 'cararra', rgb: 0xEEEEE8, origin: './ntc' },
  { name: 'manz', rgb: 0xEEEF78, origin: './ntc' },
  { name: 'tahuna sands', rgb: 0xEEF0C8, origin: './ntc' },
  { name: 'athens gray', rgb: 0xEEF0F3, origin: './ntc' },
  { name: 'tusk', rgb: 0xEEF3C3, origin: './ntc' },
  { name: 'loafer', rgb: 0xEEF4DE, origin: './ntc' },
  { name: 'catskill white', rgb: 0xEEF6F7, origin: './ntc' },
  { name: 'twilight blue', rgb: 0xEEFDFF, origin: './ntc' },
  { name: 'jonquil', rgb: 0xEEFF9A, origin: './ntc' },
  { name: 'rice flower', rgb: 0xEEFFE2, origin: './ntc' },
  { name: 'jaffa', rgb: 0xEF863F, origin: './ntc' },
  { name: 'gallery', rgb: 0xEFEFEF, origin: './ntc' },
  { name: 'porcelain', rgb: 0xEFF2F3, origin: './ntc' },
  { name: 'mauvelous', rgb: 0xF091A9, origin: './ntc' },
  { name: 'golden dream', rgb: 0xF0D52D, origin: './ntc' },
  { name: 'golden sand', rgb: 0xF0DB7D, origin: './ntc' },
  { name: 'buff', rgb: 0xF0DC82, origin: './ntc' },
  { name: 'prim', rgb: 0xF0E2EC, origin: './ntc' },
  { name: 'khaki', rgb: 0xF0E68C, origin: './ntc' },
  { name: 'selago', rgb: 0xF0EEFD, origin: './ntc' },
  { name: 'titan white', rgb: 0xF0EEFF, origin: './ntc' },
  { name: 'alice blue', rgb: 0xF0F8FF, origin: './ntc' },
  { name: 'feta', rgb: 0xF0FCEA, origin: './ntc' },
  { name: 'gold drop', rgb: 0xF18200, origin: './ntc' },
  { name: 'wewak', rgb: 0xF19BAB, origin: './ntc' },
  { name: 'sahara sand', rgb: 0xF1E788, origin: './ntc' },
  { name: 'parchment', rgb: 0xF1E9D2, origin: './ntc' },
  { name: 'blue chalk', rgb: 0xF1E9FF, origin: './ntc' },
  { name: 'mint julep', rgb: 0xF1EEC1, origin: './ntc' },
  { name: 'seashell', rgb: 0xF1F1F1, origin: './ntc' },
  { name: 'saltpan', rgb: 0xF1F7F2, origin: './ntc' },
  { name: 'tidal', rgb: 0xF1FFAD, origin: './ntc' },
  { name: 'chiffon', rgb: 0xF1FFC8, origin: './ntc' },
  { name: 'flamingo', rgb: 0xF2552A, origin: './ntc' },
  { name: 'tangerine', rgb: 0xF28500, origin: './ntc' },
  { name: 'mandys pink', rgb: 0xF2C3B2, origin: './ntc' },
  { name: 'concrete', rgb: 0xF2F2F2, origin: './ntc' },
  { name: 'black squeeze', rgb: 0xF2FAFA, origin: './ntc' },
  { name: 'pomegranate', rgb: 0xF34723, origin: './ntc' },
  { name: 'buttercup', rgb: 0xF3AD16, origin: './ntc' },
  { name: 'new orleans', rgb: 0xF3D69D, origin: './ntc' },
  { name: 'vanilla ice', rgb: 0xF3D9DF, origin: './ntc' },
  { name: 'sidecar', rgb: 0xF3E7BB, origin: './ntc' },
  { name: 'dawn pink', rgb: 0xF3E9E5, origin: './ntc' },
  { name: 'wheatfield', rgb: 0xF3EDCF, origin: './ntc' },
  { name: 'canary', rgb: 0xF3FB62, origin: './ntc' },
  { name: 'orinoco', rgb: 0xF3FBD4, origin: './ntc' },
  { name: 'carla', rgb: 0xF3FFD8, origin: './ntc' },
  { name: 'hollywood cerise', rgb: 0xF400A1, origin: './ntc' },
  { name: 'sandy brown', rgb: 0xF4A460, origin: './ntc' },
  { name: 'saffron', rgb: 0xF4C430, origin: './ntc' },
  { name: 'ripe lemon', rgb: 0xF4D81C, origin: './ntc' },
  { name: 'janna', rgb: 0xF4EBD3, origin: './ntc' },
  { name: 'pampas', rgb: 0xF4F2EE, origin: './ntc' },
  { name: 'wild sand', rgb: 0xF4F4F4, origin: './ntc' },
  { name: 'zircon', rgb: 0xF4F8FF, origin: './ntc' },
  { name: 'froly', rgb: 0xF57584, origin: './ntc' },
  { name: 'cream can', rgb: 0xF5C85C, origin: './ntc' },
  { name: 'manhattan', rgb: 0xF5C999, origin: './ntc' },
  { name: 'maize', rgb: 0xF5D5A0, origin: './ntc' },
  { name: 'wheat', rgb: 0xF5DEB3, origin: './ntc' },
  { name: 'sandwisp', rgb: 0xF5E7A2, origin: './ntc' },
  { name: 'pot pourri', rgb: 0xF5E7E2, origin: './ntc' },
  { name: 'albescent white', rgb: 0xF5E9D3, origin: './ntc' },
  { name: 'soft peach', rgb: 0xF5EDEF, origin: './ntc' },
  { name: 'ecru white', rgb: 0xF5F3E5, origin: './ntc' },
  { name: 'beige', rgb: 0xF5F5DC, origin: './ntc' },
  { name: 'golden fizz', rgb: 0xF5FB3D, origin: './ntc' },
  { name: 'australian mint', rgb: 0xF5FFBE, origin: './ntc' },
  { name: 'french rose', rgb: 0xF64A8A, origin: './ntc' },
  { name: 'brilliant rose', rgb: 0xF653A6, origin: './ntc' },
  { name: 'illusion', rgb: 0xF6A4C9, origin: './ntc' },
  { name: 'merino', rgb: 0xF6F0E6, origin: './ntc' },
  { name: 'black haze', rgb: 0xF6F7F7, origin: './ntc' },
  { name: 'spring sun', rgb: 0xF6FFDC, origin: './ntc' },
  { name: 'violet red', rgb: 0xF7468A, origin: './ntc' },
  { name: 'chilean fire', rgb: 0xF77703, origin: './ntc' },
  { name: 'persian pink', rgb: 0xF77FBE, origin: './ntc' },
  { name: 'rajah', rgb: 0xF7B668, origin: './ntc' },
  { name: 'azalea', rgb: 0xF7C8DA, origin: './ntc' },
  { name: 'we peep', rgb: 0xF7DBE6, origin: './ntc' },
  { name: 'quarter spanish white', rgb: 0xF7F2E1, origin: './ntc' },
  { name: 'whisper', rgb: 0xF7F5FA, origin: './ntc' },
  { name: 'snow drift', rgb: 0xF7FAF7, origin: './ntc' },
  { name: 'casablanca', rgb: 0xF8B853, origin: './ntc' },
  { name: 'chantilly', rgb: 0xF8C3DF, origin: './ntc' },
  { name: 'cherub', rgb: 0xF8D9E9, origin: './ntc' },
  { name: 'marzipan', rgb: 0xF8DB9D, origin: './ntc' },
  { name: 'energy yellow', rgb: 0xF8DD5C, origin: './ntc' },
  { name: 'givry', rgb: 0xF8E4BF, origin: './ntc' },
  { name: 'white linen', rgb: 0xF8F0E8, origin: './ntc' },
  { name: 'magnolia', rgb: 0xF8F4FF, origin: './ntc' },
  { name: 'spring wood', rgb: 0xF8F6F1, origin: './ntc' },
  { name: 'coconut cream', rgb: 0xF8F7DC, origin: './ntc' },
  { name: 'white lilac', rgb: 0xF8F7FC, origin: './ntc' },
  { name: 'desert storm', rgb: 0xF8F8F7, origin: './ntc' },
  { name: 'texas', rgb: 0xF8F99C, origin: './ntc' },
  { name: 'corn field', rgb: 0xF8FACD, origin: './ntc' },
  { name: 'mimosa', rgb: 0xF8FDD3, origin: './ntc' },
  { name: 'carnation', rgb: 0xF95A61, origin: './ntc' },
  { name: 'saffron mango', rgb: 0xF9BF58, origin: './ntc' },
  { name: 'carousel pink', rgb: 0xF9E0ED, origin: './ntc' },
  { name: 'dairy cream', rgb: 0xF9E4BC, origin: './ntc' },
  { name: 'portica', rgb: 0xF9E663, origin: './ntc' },
  { name: 'amour', rgb: 0xF9EAF3, origin: './ntc' },
  { name: 'rum swizzle', rgb: 0xF9F8E4, origin: './ntc' },
  { name: 'dolly', rgb: 0xF9FF8B, origin: './ntc' },
  { name: 'sugar cane', rgb: 0xF9FFF6, origin: './ntc' },
  { name: 'ecstasy', rgb: 0xFA7814, origin: './ntc' },
  { name: 'tan hide', rgb: 0xFA9D5A, origin: './ntc' },
  { name: 'corvette', rgb: 0xFAD3A2, origin: './ntc' },
  { name: 'peach yellow', rgb: 0xFADFAD, origin: './ntc' },
  { name: 'turbo', rgb: 0xFAE600, origin: './ntc' },
  { name: 'astra', rgb: 0xFAEAB9, origin: './ntc' },
  { name: 'champagne', rgb: 0xFAECCC, origin: './ntc' },
  { name: 'linen', rgb: 0xFAF0E6, origin: './ntc' },
  { name: 'fantasy', rgb: 0xFAF3F0, origin: './ntc' },
  { name: 'citrine white', rgb: 0xFAF7D6, origin: './ntc' },
  { name: 'alabaster', rgb: 0xFAFAFA, origin: './ntc' },
  { name: 'hint of yellow', rgb: 0xFAFDE4, origin: './ntc' },
  { name: 'milan', rgb: 0xFAFFA4, origin: './ntc' },
  { name: 'brink pink', rgb: 0xFB607F, origin: './ntc' },
  { name: 'geraldine', rgb: 0xFB8989, origin: './ntc' },
  { name: 'lavender rose', rgb: 0xFBA0E3, origin: './ntc' },
  { name: 'sea buckthorn', rgb: 0xFBA129, origin: './ntc' },
  { name: 'sun', rgb: 0xFBAC13, origin: './ntc' },
  { name: 'lavender pink', rgb: 0xFBAED2, origin: './ntc' },
  { name: 'rose bud', rgb: 0xFBB2A3, origin: './ntc' },
  { name: 'cupid', rgb: 0xFBBEDA, origin: './ntc' },
  { name: 'classic rose', rgb: 0xFBCCE7, origin: './ntc' },
  { name: 'apricot peach', rgb: 0xFBCEB1, origin: './ntc' },
  { name: 'banana mania', rgb: 0xFBE7B2, origin: './ntc' },
  { name: 'marigold yellow', rgb: 0xFBE870, origin: './ntc' },
  { name: 'festival', rgb: 0xFBE96C, origin: './ntc' },
  { name: 'sweet corn', rgb: 0xFBEA8C, origin: './ntc' },
  { name: 'candy corn', rgb: 0xFBEC5D, origin: './ntc' },
  { name: 'hint of red', rgb: 0xFBF9F9, origin: './ntc' },
  { name: 'shalimar', rgb: 0xFBFFBA, origin: './ntc' },
  { name: 'shocking pink', rgb: 0xFC0FC0, origin: './ntc' },
  { name: 'tickle me pink', rgb: 0xFC80A5, origin: './ntc' },
  { name: 'tree poppy', rgb: 0xFC9C1D, origin: './ntc' },
  { name: 'lightning yellow', rgb: 0xFCC01E, origin: './ntc' },
  { name: 'goldenrod', rgb: 0xFCD667, origin: './ntc' },
  { name: 'candlelight', rgb: 0xFCD917, origin: './ntc' },
  { name: 'cherokee', rgb: 0xFCDA98, origin: './ntc' },
  { name: 'double pearl lusta', rgb: 0xFCF4D0, origin: './ntc' },
  { name: 'pearl lusta', rgb: 0xFCF4DC, origin: './ntc' },
  { name: 'vista white', rgb: 0xFCF8F7, origin: './ntc' },
  { name: 'bianca', rgb: 0xFCFBF3, origin: './ntc' },
  { name: 'moon glow', rgb: 0xFCFEDA, origin: './ntc' },
  { name: 'china ivory', rgb: 0xFCFFE7, origin: './ntc' },
  { name: 'ceramic', rgb: 0xFCFFF9, origin: './ntc' },
  { name: 'torch red', rgb: 0xFD0E35, origin: './ntc' },
  { name: 'wild watermelon', rgb: 0xFD5B78, origin: './ntc' },
  { name: 'crusta', rgb: 0xFD7B33, origin: './ntc' },
  { name: 'sorbus', rgb: 0xFD7C07, origin: './ntc' },
  { name: 'sweet pink', rgb: 0xFD9FA2, origin: './ntc' },
  { name: 'light apricot', rgb: 0xFDD5B1, origin: './ntc' },
  { name: 'pig pink', rgb: 0xFDD7E4, origin: './ntc' },
  { name: 'cinderella', rgb: 0xFDE1DC, origin: './ntc' },
  { name: 'golden glow', rgb: 0xFDE295, origin: './ntc' },
  { name: 'lemon', rgb: 0xFDE910, origin: './ntc' },
  { name: 'old lace', rgb: 0xFDF5E6, origin: './ntc' },
  { name: 'half colonial white', rgb: 0xFDF6D3, origin: './ntc' },
  { name: 'drover', rgb: 0xFDF7AD, origin: './ntc' },
  { name: 'pale prim', rgb: 0xFDFEB8, origin: './ntc' },
  { name: 'cumulus', rgb: 0xFDFFD5, origin: './ntc' },
  { name: 'persian rose', rgb: 0xFE28A2, origin: './ntc' },
  { name: 'sunset orange', rgb: 0xFE4C40, origin: './ntc' },
  { name: 'bittersweet', rgb: 0xFE6F5E, origin: './ntc' },
  { name: 'california', rgb: 0xFE9D04, origin: './ntc' },
  { name: 'yellow sea', rgb: 0xFEA904, origin: './ntc' },
  { name: 'melon', rgb: 0xFEBAAD, origin: './ntc' },
  { name: 'bright sun', rgb: 0xFED33C, origin: './ntc' },
  { name: 'dandelion', rgb: 0xFED85D, origin: './ntc' },
  { name: 'salomie', rgb: 0xFEDB8D, origin: './ntc' },
  { name: 'cape honey', rgb: 0xFEE5AC, origin: './ntc' },
  { name: 'remy', rgb: 0xFEEBF3, origin: './ntc' },
  { name: 'oasis', rgb: 0xFEEFCE, origin: './ntc' },
  { name: 'bridesmaid', rgb: 0xFEF0EC, origin: './ntc' },
  { name: 'beeswax', rgb: 0xFEF2C7, origin: './ntc' },
  { name: 'bleach white', rgb: 0xFEF3D8, origin: './ntc' },
  { name: 'pipi', rgb: 0xFEF4CC, origin: './ntc' },
  { name: 'half spanish white', rgb: 0xFEF4DB, origin: './ntc' },
  { name: 'wisp pink', rgb: 0xFEF4F8, origin: './ntc' },
  { name: 'provincial pink', rgb: 0xFEF5F1, origin: './ntc' },
  { name: 'half dutch white', rgb: 0xFEF7DE, origin: './ntc' },
  { name: 'solitaire', rgb: 0xFEF8E2, origin: './ntc' },
  { name: 'white pointer', rgb: 0xFEF8FF, origin: './ntc' },
  { name: 'off yellow', rgb: 0xFEF9E3, origin: './ntc' },
  { name: 'orange white', rgb: 0xFEFCED, origin: './ntc' },
  { name: 'red', rgb: 0xFF0000, origin: './ntc' },
  { name: 'rose', rgb: 0xFF007F, origin: './ntc' },
  { name: 'purple pizzazz', rgb: 0xFF00CC, origin: './ntc' },
  { name: 'magenta / fuchsia', rgb: 0xFF00FF, origin: './ntc' },
  { name: 'scarlet', rgb: 0xFF2400, origin: './ntc' },
  { name: 'wild strawberry', rgb: 0xFF3399, origin: './ntc' },
  { name: 'razzle dazzle rose', rgb: 0xFF33CC, origin: './ntc' },
  { name: 'radical red', rgb: 0xFF355E, origin: './ntc' },
  { name: 'red orange', rgb: 0xFF3F34, origin: './ntc' },
  { name: 'coral red', rgb: 0xFF4040, origin: './ntc' },
  { name: 'vermilion', rgb: 0xFF4D00, origin: './ntc' },
  { name: 'international orange', rgb: 0xFF4F00, origin: './ntc' },
  { name: 'outrageous orange', rgb: 0xFF6037, origin: './ntc' },
  { name: 'blaze orange', rgb: 0xFF6600, origin: './ntc' },
  { name: 'pink flamingo', rgb: 0xFF66FF, origin: './ntc' },
  { name: 'orange', rgb: 0xFF681F, origin: './ntc' },
  { name: 'hot pink', rgb: 0xFF69B4, origin: './ntc' },
  { name: 'persimmon', rgb: 0xFF6B53, origin: './ntc' },
  { name: 'blush pink', rgb: 0xFF6FFF, origin: './ntc' },
  { name: 'burning orange', rgb: 0xFF7034, origin: './ntc' },
  { name: 'pumpkin', rgb: 0xFF7518, origin: './ntc' },
  { name: 'flamenco', rgb: 0xFF7D07, origin: './ntc' },
  { name: 'flush orange', rgb: 0xFF7F00, origin: './ntc' },
  { name: 'coral', rgb: 0xFF7F50, origin: './ntc' },
  { name: 'salmon', rgb: 0xFF8C69, origin: './ntc' },
  { name: 'pizazz', rgb: 0xFF9000, origin: './ntc' },
  { name: 'west side', rgb: 0xFF910F, origin: './ntc' },
  { name: 'pink salmon', rgb: 0xFF91A4, origin: './ntc' },
  { name: 'neon carrot', rgb: 0xFF9933, origin: './ntc' },
  { name: 'atomic tangerine', rgb: 0xFF9966, origin: './ntc' },
  { name: 'vivid tangerine', rgb: 0xFF9980, origin: './ntc' },
  { name: 'sunshade', rgb: 0xFF9E2C, origin: './ntc' },
  { name: 'orange peel', rgb: 0xFFA000, origin: './ntc' },
  { name: 'mona lisa', rgb: 0xFFA194, origin: './ntc' },
  { name: 'web orange', rgb: 0xFFA500, origin: './ntc' },
  { name: 'carnation pink', rgb: 0xFFA6C9, origin: './ntc' },
  { name: 'hit pink', rgb: 0xFFAB81, origin: './ntc' },
  { name: 'yellow orange', rgb: 0xFFAE42, origin: './ntc' },
  { name: 'cornflower lilac', rgb: 0xFFB0AC, origin: './ntc' },
  { name: 'sundown', rgb: 0xFFB1B3, origin: './ntc' },
  { name: 'my sin', rgb: 0xFFB31F, origin: './ntc' },
  { name: 'texas rose', rgb: 0xFFB555, origin: './ntc' },
  { name: 'cotton candy', rgb: 0xFFB7D5, origin: './ntc' },
  { name: 'macaroni and cheese', rgb: 0xFFB97B, origin: './ntc' },
  { name: 'selective yellow', rgb: 0xFFBA00, origin: './ntc' },
  { name: 'koromiko', rgb: 0xFFBD5F, origin: './ntc' },
  { name: 'amber', rgb: 0xFFBF00, origin: './ntc' },
  { name: 'wax flower', rgb: 0xFFC0A8, origin: './ntc' },
  { name: 'pink', rgb: 0xFFC0CB, origin: './ntc' },
  { name: 'your pink', rgb: 0xFFC3C0, origin: './ntc' },
  { name: 'supernova', rgb: 0xFFC901, origin: './ntc' },
  { name: 'flesh', rgb: 0xFFCBA4, origin: './ntc' },
  { name: 'sunglow', rgb: 0xFFCC33, origin: './ntc' },
  { name: 'golden tainoi', rgb: 0xFFCC5C, origin: './ntc' },
  { name: 'peach orange', rgb: 0xFFCC99, origin: './ntc' },
  { name: 'chardonnay', rgb: 0xFFCD8C, origin: './ntc' },
  { name: 'pastel pink', rgb: 0xFFD1DC, origin: './ntc' },
  { name: 'romantic', rgb: 0xFFD2B7, origin: './ntc' },
  { name: 'grandis', rgb: 0xFFD38C, origin: './ntc' },
  { name: 'gold', rgb: 0xFFD700, origin: './ntc' },
  { name: 'school bus yellow', rgb: 0xFFD800, origin: './ntc' },
  { name: 'cosmos', rgb: 0xFFD8D9, origin: './ntc' },
  { name: 'mustard', rgb: 0xFFDB58, origin: './ntc' },
  { name: 'peach schnapps', rgb: 0xFFDCD6, origin: './ntc' },
  { name: 'caramel', rgb: 0xFFDDAF, origin: './ntc' },
  { name: 'tuft bush', rgb: 0xFFDDCD, origin: './ntc' },
  { name: 'watusi', rgb: 0xFFDDCF, origin: './ntc' },
  { name: 'pink lace', rgb: 0xFFDDF4, origin: './ntc' },
  { name: 'navajo white', rgb: 0xFFDEAD, origin: './ntc' },
  { name: 'frangipani', rgb: 0xFFDEB3, origin: './ntc' },
  { name: 'pippin', rgb: 0xFFE1DF, origin: './ntc' },
  { name: 'pale rose', rgb: 0xFFE1F2, origin: './ntc' },
  { name: 'negroni', rgb: 0xFFE2C5, origin: './ntc' },
  { name: 'cream brulee', rgb: 0xFFE5A0, origin: './ntc' },
  { name: 'peach', rgb: 0xFFE5B4, origin: './ntc' },
  { name: 'tequila', rgb: 0xFFE6C7, origin: './ntc' },
  { name: 'kournikova', rgb: 0xFFE772, origin: './ntc' },
  { name: 'sandy beach', rgb: 0xFFEAC8, origin: './ntc' },
  { name: 'karry', rgb: 0xFFEAD4, origin: './ntc' },
  { name: 'broom', rgb: 0xFFEC13, origin: './ntc' },
  { name: 'colonial white', rgb: 0xFFEDBC, origin: './ntc' },
  { name: 'derby', rgb: 0xFFEED8, origin: './ntc' },
  { name: 'vis vis', rgb: 0xFFEFA1, origin: './ntc' },
  { name: 'egg white', rgb: 0xFFEFC1, origin: './ntc' },
  { name: 'papaya whip', rgb: 0xFFEFD5, origin: './ntc' },
  { name: 'fair pink', rgb: 0xFFEFEC, origin: './ntc' },
  { name: 'peach cream', rgb: 0xFFF0DB, origin: './ntc' },
  { name: 'lavender blush', rgb: 0xFFF0F5, origin: './ntc' },
  { name: 'gorse', rgb: 0xFFF14F, origin: './ntc' },
  { name: 'buttermilk', rgb: 0xFFF1B5, origin: './ntc' },
  { name: 'pink lady', rgb: 0xFFF1D8, origin: './ntc' },
  { name: 'forget me not', rgb: 0xFFF1EE, origin: './ntc' },
  { name: 'tutu', rgb: 0xFFF1F9, origin: './ntc' },
  { name: 'picasso', rgb: 0xFFF39D, origin: './ntc' },
  { name: 'chardon', rgb: 0xFFF3F1, origin: './ntc' },
  { name: 'paris daisy', rgb: 0xFFF46E, origin: './ntc' },
  { name: 'barley white', rgb: 0xFFF4CE, origin: './ntc' },
  { name: 'egg sour', rgb: 0xFFF4DD, origin: './ntc' },
  { name: 'sazerac', rgb: 0xFFF4E0, origin: './ntc' },
  { name: 'serenade', rgb: 0xFFF4E8, origin: './ntc' },
  { name: 'chablis', rgb: 0xFFF4F3, origin: './ntc' },
  { name: 'seashell peach', rgb: 0xFFF5EE, origin: './ntc' },
  { name: 'sauvignon', rgb: 0xFFF5F3, origin: './ntc' },
  { name: 'milk punch', rgb: 0xFFF6D4, origin: './ntc' },
  { name: 'varden', rgb: 0xFFF6DF, origin: './ntc' },
  { name: 'rose white', rgb: 0xFFF6F5, origin: './ntc' },
  { name: 'baja white', rgb: 0xFFF8D1, origin: './ntc' },
  { name: 'gin fizz', rgb: 0xFFF9E2, origin: './ntc' },
  { name: 'early dawn', rgb: 0xFFF9E6, origin: './ntc' },
  { name: 'lemon chiffon', rgb: 0xFFFACD, origin: './ntc' },
  { name: 'bridal heath', rgb: 0xFFFAF4, origin: './ntc' },
  { name: 'scotch mist', rgb: 0xFFFBDC, origin: './ntc' },
  { name: 'soapstone', rgb: 0xFFFBF9, origin: './ntc' },
  { name: 'witch haze', rgb: 0xFFFC99, origin: './ntc' },
  { name: 'buttery white', rgb: 0xFFFCEA, origin: './ntc' },
  { name: 'island spice', rgb: 0xFFFCEE, origin: './ntc' },
  { name: 'cream', rgb: 0xFFFDD0, origin: './ntc' },
  { name: 'chilean heath', rgb: 0xFFFDE6, origin: './ntc' },
  { name: 'travertine', rgb: 0xFFFDE8, origin: './ntc' },
  { name: 'orchid white', rgb: 0xFFFDF3, origin: './ntc' },
  { name: 'quarter pearl lusta', rgb: 0xFFFDF4, origin: './ntc' },
  { name: 'half and half', rgb: 0xFFFEE1, origin: './ntc' },
  { name: 'apricot white', rgb: 0xFFFEEC, origin: './ntc' },
  { name: 'rice cake', rgb: 0xFFFEF0, origin: './ntc' },
  { name: 'black white', rgb: 0xFFFEF6, origin: './ntc' },
  { name: 'romance', rgb: 0xFFFEFD, origin: './ntc' },
  { name: 'yellow', rgb: 0xFFFF00, origin: './ntc' },
  { name: 'laser lemon', rgb: 0xFFFF66, origin: './ntc' },
  { name: 'pale canary', rgb: 0xFFFF99, origin: './ntc' },
  { name: 'portafino', rgb: 0xFFFFB4, origin: './ntc' },
  { name: 'ivory', rgb: 0xFFFFF0, origin: './ntc' },
  { name: 'white', rgb: 0xFFFFFF, origin: './ntc' },
  { name: 'mahogany', rgb: 0xCD4A4A, origin: './pantone' },
  { name: 'fuzzy wuzzy brown', rgb: 0xCC6666, origin: './pantone' },
  { name: 'chestnut', rgb: 0xBC5D58, origin: './pantone' },
  { name: 'red orange', rgb: 0xFF5349, origin: './pantone' },
  { name: 'sunset orange', rgb: 0xFD5E53, origin: './pantone' },
  { name: 'bittersweet', rgb: 0xFD7C6E, origin: './pantone' },
  { name: 'melon', rgb: 0xFDBCB4, origin: './pantone' },
  { name: 'outrageous orange', rgb: 0xFF6E4A, origin: './pantone' },
  { name: 'vivid tangerine', rgb: 0xFFA089, origin: './pantone' },
  { name: 'burnt sienna', rgb: 0xEA7E5D, origin: './pantone' },
  { name: 'brown', rgb: 0xB4674D, origin: './pantone' },
  { name: 'sepia', rgb: 0xA5694F, origin: './pantone' },
  { name: 'orange', rgb: 0xFF7538, origin: './pantone' },
  { name: 'burnt orange', rgb: 0xFF7F49, origin: './pantone' },
  { name: 'copper', rgb: 0xDD9475, origin: './pantone' },
  { name: 'mango tango', rgb: 0xFF8243, origin: './pantone' },
  { name: 'atomic tangerine', rgb: 0xFFA474, origin: './pantone' },
  { name: 'beaver', rgb: 0x9F8170, origin: './pantone' },
  { name: 'antique brass', rgb: 0xCD9575, origin: './pantone' },
  { name: 'desert sand', rgb: 0xEFCDB8, origin: './pantone' },
  { name: 'raw sienna', rgb: 0xD68A59, origin: './pantone' },
  { name: 'tumbleweed', rgb: 0xDEAA88, origin: './pantone' },
  { name: 'tan', rgb: 0xFAA76C, origin: './pantone' },
  { name: 'peach', rgb: 0xFFCFAB, origin: './pantone' },
  { name: 'macaroni and cheese', rgb: 0xFFBD88, origin: './pantone' },
  { name: 'apricot', rgb: 0xFDD9B5, origin: './pantone' },
  { name: 'neon carrot', rgb: 0xFFA343, origin: './pantone' },
  { name: 'almond', rgb: 0xEFDBC5, origin: './pantone' },
  { name: 'yellow orange', rgb: 0xFFB653, origin: './pantone' },
  { name: 'gold', rgb: 0xE7C697, origin: './pantone' },
  { name: 'shadow', rgb: 0x8A795D, origin: './pantone' },
  { name: 'banana mania', rgb: 0xFAE7B5, origin: './pantone' },
  { name: 'sunglow', rgb: 0xFFCF48, origin: './pantone' },
  { name: 'goldenrod', rgb: 0xFCD975, origin: './pantone' },
  { name: 'dandelion', rgb: 0xFDDB6D, origin: './pantone' },
  { name: 'yellow', rgb: 0xFCE883, origin: './pantone' },
  { name: 'green yellow', rgb: 0xF0E891, origin: './pantone' },
  { name: 'spring green', rgb: 0xECEABE, origin: './pantone' },
  { name: 'olive green', rgb: 0xBAB86C, origin: './pantone' },
  { name: 'laser lemon', rgb: 0xFDFC74, origin: './pantone' },
  { name: 'unmellow yellow', rgb: 0xFDFC74, origin: './pantone' },
  { name: 'canary', rgb: 0xFFFF99, origin: './pantone' },
  { name: 'yellow green', rgb: 0xC5E384, origin: './pantone' },
  { name: 'inch worm', rgb: 0xB2EC5D, origin: './pantone' },
  { name: 'asparagus', rgb: 0x87A96B, origin: './pantone' },
  { name: 'granny smith apple', rgb: 0xA8E4A0, origin: './pantone' },
  { name: 'electric lime', rgb: 0x1DF914, origin: './pantone' },
  { name: 'screamin green', rgb: 0x76FF7A, origin: './pantone' },
  { name: 'fern', rgb: 0x71BC78, origin: './pantone' },
  { name: 'forest green', rgb: 0x6DAE81, origin: './pantone' },
  { name: 'sea green', rgb: 0x9FE2BF, origin: './pantone' },
  { name: 'green', rgb: 0x1CAC78, origin: './pantone' },
  { name: 'mountain meadow', rgb: 0x30BA8F, origin: './pantone' },
  { name: 'shamrock', rgb: 0x45CEA2, origin: './pantone' },
  { name: 'jungle green', rgb: 0x3BB08F, origin: './pantone' },
  { name: 'caribbean green', rgb: 0x1CD3A2, origin: './pantone' },
  { name: 'tropical rain forest', rgb: 0x17806D, origin: './pantone' },
  { name: 'pine green', rgb: 0x158078, origin: './pantone' },
  { name: 'robin egg blue', rgb: 0x1FCECB, origin: './pantone' },
  { name: 'aquamarine', rgb: 0x78DBE2, origin: './pantone' },
  { name: 'turquoise blue', rgb: 0x77DDE7, origin: './pantone' },
  { name: 'sky blue', rgb: 0x80DAEB, origin: './pantone' },
  { name: 'outer space', rgb: 0x414A4C, origin: './pantone' },
  { name: 'blue green', rgb: 0x199EBD, origin: './pantone' },
  { name: 'pacific blue', rgb: 0x1CA9C9, origin: './pantone' },
  { name: 'cerulean', rgb: 0x1DACD6, origin: './pantone' },
  { name: 'cornflower', rgb: 0x9ACEEB, origin: './pantone' },
  { name: 'midnight blue', rgb: 0x1A4876, origin: './pantone' },
  { name: 'navy blue', rgb: 0x1974D2, origin: './pantone' },
  { name: 'denim', rgb: 0x2B6CC4, origin: './pantone' },
  { name: 'blue', rgb: 0x1F75FE, origin: './pantone' },
  { name: 'periwinkle', rgb: 0xC5D0E6, origin: './pantone' },
  { name: 'cadet blue', rgb: 0xB0B7C6, origin: './pantone' },
  { name: 'indigo', rgb: 0x5D76CB, origin: './pantone' },
  { name: 'wild blue yonder', rgb: 0xA2ADD0, origin: './pantone' },
  { name: 'manatee', rgb: 0x979AAA, origin: './pantone' },
  { name: 'blue bell', rgb: 0xADADD6, origin: './pantone' },
  { name: 'blue violet', rgb: 0x7366BD, origin: './pantone' },
  { name: 'purple heart', rgb: 0x7442C8, origin: './pantone' },
  { name: 'royal purple', rgb: 0x7851A9, origin: './pantone' },
  { name: 'purple mountains’ majesty', rgb: 0x9D81BA, origin: './pantone' },
  { name: 'violet (purple)', rgb: 0x926EAE, origin: './pantone' },
  { name: 'wisteria', rgb: 0xCDA4DE, origin: './pantone' },
  { name: 'vivid violet', rgb: 0x8F509D, origin: './pantone' },
  { name: 'fuchsia', rgb: 0xC364C5, origin: './pantone' },
  { name: 'shocking pink', rgb: 0xFB7EFD, origin: './pantone' },
  { name: 'pink flamingo', rgb: 0xFC74FD, origin: './pantone' },
  { name: 'plum', rgb: 0x8E4585, origin: './pantone' },
  { name: 'hot magenta', rgb: 0xFF1DCE, origin: './pantone' },
  { name: 'purple pizzazz', rgb: 0xFF1DCE, origin: './pantone' },
  { name: 'razzle dazzle rose', rgb: 0xFF48D0, origin: './pantone' },
  { name: 'orchid', rgb: 0xE6A8D7, origin: './pantone' },
  { name: 'red violet', rgb: 0xC0448F, origin: './pantone' },
  { name: 'eggplant', rgb: 0x6E5160, origin: './pantone' },
  { name: 'cerise', rgb: 0xDD4492, origin: './pantone' },
  { name: 'wild strawberry', rgb: 0xFF43A4, origin: './pantone' },
  { name: 'magenta', rgb: 0xF664AF, origin: './pantone' },
  { name: 'lavender', rgb: 0xFCB4D5, origin: './pantone' },
  { name: 'cotton candy', rgb: 0xFFBCD9, origin: './pantone' },
  { name: 'violet red', rgb: 0xF75394, origin: './pantone' },
  { name: 'carnation pink', rgb: 0xFFAACC, origin: './pantone' },
  { name: 'razzmatazz', rgb: 0xE3256B, origin: './pantone' },
  { name: 'piggy pink', rgb: 0xFDD7E4, origin: './pantone' },
  { name: 'jazzberry jam', rgb: 0xCA3767, origin: './pantone' },
  { name: 'blush', rgb: 0xDE5D83, origin: './pantone' },
  { name: 'tickle me pink', rgb: 0xFC89AC, origin: './pantone' },
  { name: 'pink sherbet', rgb: 0xF780A1, origin: './pantone' },
  { name: 'maroon', rgb: 0xC8385A, origin: './pantone' },
  { name: 'red', rgb: 0xEE204D, origin: './pantone' },
  { name: 'radical red', rgb: 0xFF496C, origin: './pantone' },
  { name: 'mauvelous', rgb: 0xEF98AA, origin: './pantone' },
  { name: 'wild watermelon', rgb: 0xFC6C85, origin: './pantone' },
  { name: 'scarlet', rgb: 0xFC2847, origin: './pantone' },
  { name: 'salmon', rgb: 0xFF9BAA, origin: './pantone' },
  { name: 'brick red', rgb: 0xCB4154, origin: './pantone' },
  { name: 'white', rgb: 0xEDEDED, origin: './pantone' },
  { name: 'timberwolf', rgb: 0xDBD7D2, origin: './pantone' },
  { name: 'silver', rgb: 0xCDC5C2, origin: './pantone' },
  { name: 'gray', rgb: 0x95918C, origin: './pantone' },
  { name: 'black', rgb: 0x232323, origin: './pantone' },
  { name: 'red', rgb: 0xFF0000, origin: './roygbiv' },
  { name: 'orange', rgb: 0xFFA500, origin: './roygbiv' },
  { name: 'yellow', rgb: 0xFFFF00, origin: './roygbiv' },
  { name: 'green', rgb: 0x008000, origin: './roygbiv' },
  { name: 'blue', rgb: 0x0000FF, origin: './roygbiv' },
  { name: 'indigo', rgb: 0x4B0082, origin: './roygbiv' },
  { name: 'violet', rgb: 0xEE82EE, origin: './roygbiv' },
  { name: 'indigo', rgb: 0x4b0082, origin: './x11' },
  { name: 'gold', rgb: 0xffd700, origin: './x11' },
  { name: 'hotpink', rgb: 0xff69b4, origin: './x11' },
  { name: 'firebrick', rgb: 0xb22222, origin: './x11' },
  { name: 'indianred', rgb: 0xcd5c5c, origin: './x11' },
  { name: 'yellow', rgb: 0xffff00, origin: './x11' },
  { name: 'mistyrose', rgb: 0xffe4e1, origin: './x11' },
  { name: 'darkolivegreen', rgb: 0x556b2f, origin: './x11' },
  { name: 'olive', rgb: 0x808000, origin: './x11' },
  { name: 'darkseagreen', rgb: 0x8fbc8f, origin: './x11' },
  { name: 'pink', rgb: 0xffc0cb, origin: './x11' },
  { name: 'tomato', rgb: 0xff6347, origin: './x11' },
  { name: 'lightcoral', rgb: 0xf08080, origin: './x11' },
  { name: 'orangered', rgb: 0xff4500, origin: './x11' },
  { name: 'navajowhite', rgb: 0xffdead, origin: './x11' },
  { name: 'lime', rgb: 0x00ff00, origin: './x11' },
  { name: 'palegreen', rgb: 0x98fb98, origin: './x11' },
  { name: 'darkslategrey', rgb: 0x2f4f4f, origin: './x11' },
  { name: 'greenyellow', rgb: 0xadff2f, origin: './x11' },
  { name: 'burlywood', rgb: 0xdeb887, origin: './x11' },
  { name: 'seashell', rgb: 0xfff5ee, origin: './x11' },
  { name: 'mediumspringgreen', rgb: 0x00fa9a, origin: './x11' },
  { name: 'fuchsia', rgb: 0xff00ff, origin: './x11' },
  { name: 'papayawhip', rgb: 0xffefd5, origin: './x11' },
  { name: 'blanchedalmond', rgb: 0xffebcd, origin: './x11' },
  { name: 'chartreuse', rgb: 0x7fff00, origin: './x11' },
  { name: 'dimgray', rgb: 0x696969, origin: './x11' },
  { name: 'black', rgb: 0x000000, origin: './x11' },
  { name: 'peachpuff', rgb: 0xffdab9, origin: './x11' },
  { name: 'springgreen', rgb: 0x00ff7f, origin: './x11' },
  { name: 'aquamarine', rgb: 0x7fffd4, origin: './x11' },
  { name: 'white', rgb: 0xffffff, origin: './x11' },
  { name: 'orange', rgb: 0xffa500, origin: './x11' },
  { name: 'lightsalmon', rgb: 0xffa07a, origin: './x11' },
  { name: 'darkslategray', rgb: 0x2f4f4f, origin: './x11' },
  { name: 'brown', rgb: 0xa52a2a, origin: './x11' },
  { name: 'ivory', rgb: 0xfffff0, origin: './x11' },
  { name: 'dodgerblue', rgb: 0x1e90ff, origin: './x11' },
  { name: 'peru', rgb: 0xcd853f, origin: './x11' },
  { name: 'lawngreen', rgb: 0x7cfc00, origin: './x11' },
  { name: 'chocolate', rgb: 0xd2691e, origin: './x11' },
  { name: 'crimson', rgb: 0xdc143c, origin: './x11' },
  { name: 'forestgreen', rgb: 0x228b22, origin: './x11' },
  { name: 'darkgrey', rgb: 0xa9a9a9, origin: './x11' },
  { name: 'lightseagreen', rgb: 0x20b2aa, origin: './x11' },
  { name: 'cyan', rgb: 0x00ffff, origin: './x11' },
  { name: 'mintcream', rgb: 0xf5fffa, origin: './x11' },
  { name: 'silver', rgb: 0xc0c0c0, origin: './x11' },
  { name: 'antiquewhite', rgb: 0xfaebd7, origin: './x11' },
  { name: 'mediumorchid', rgb: 0xba55d3, origin: './x11' },
  { name: 'skyblue', rgb: 0x87ceeb, origin: './x11' },
  { name: 'gray', rgb: 0x808080, origin: './x11' },
  { name: 'darkturquoise', rgb: 0x00ced1, origin: './x11' },
  { name: 'goldenrod', rgb: 0xdaa520, origin: './x11' },
  { name: 'darkgreen', rgb: 0x006400, origin: './x11' },
  { name: 'floralwhite', rgb: 0xfffaf0, origin: './x11' },
  { name: 'darkviolet', rgb: 0x9400d3, origin: './x11' },
  { name: 'darkgray', rgb: 0xa9a9a9, origin: './x11' },
  { name: 'moccasin', rgb: 0xffe4b5, origin: './x11' },
  { name: 'saddlebrown', rgb: 0x8b4513, origin: './x11' },
  { name: 'grey', rgb: 0x808080, origin: './x11' },
  { name: 'darkslateblue', rgb: 0x483d8b, origin: './x11' },
  { name: 'lightskyblue', rgb: 0x87cefa, origin: './x11' },
  { name: 'lightpink', rgb: 0xffb6c1, origin: './x11' },
  { name: 'mediumvioletred', rgb: 0xc71585, origin: './x11' },
  { name: 'slategrey', rgb: 0x708090, origin: './x11' },
  { name: 'red', rgb: 0xff0000, origin: './x11' },
  { name: 'deeppink', rgb: 0xff1493, origin: './x11' },
  { name: 'limegreen', rgb: 0x32cd32, origin: './x11' },
  { name: 'darkmagenta', rgb: 0x8b008b, origin: './x11' },
  { name: 'palegoldenrod', rgb: 0xeee8aa, origin: './x11' },
  { name: 'plum', rgb: 0xdda0dd, origin: './x11' },
  { name: 'turquoise', rgb: 0x40e0d0, origin: './x11' },
  { name: 'lightgrey', rgb: 0xd3d3d3, origin: './x11' },
  { name: 'lightgoldenrodyellow', rgb: 0xfafad2, origin: './x11' },
  { name: 'darkgoldenrod', rgb: 0xb8860b, origin: './x11' },
  { name: 'lavender', rgb: 0xe6e6fa, origin: './x11' },
  { name: 'maroon', rgb: 0x800000, origin: './x11' },
  { name: 'yellowgreen', rgb: 0x9acd32, origin: './x11' },
  { name: 'sandybrown', rgb: 0xf4a460, origin: './x11' },
  { name: 'thistle', rgb: 0xd8bfd8, origin: './x11' },
  { name: 'violet', rgb: 0xee82ee, origin: './x11' },
  { name: 'navy', rgb: 0x000080, origin: './x11' },
  { name: 'magenta', rgb: 0xff00ff, origin: './x11' },
  { name: 'dimgrey', rgb: 0x696969, origin: './x11' },
  { name: 'tan', rgb: 0xd2b48c, origin: './x11' },
  { name: 'rosybrown', rgb: 0xbc8f8f, origin: './x11' },
  { name: 'olivedrab', rgb: 0x6b8e23, origin: './x11' },
  { name: 'blue', rgb: 0x0000ff, origin: './x11' },
  { name: 'lightblue', rgb: 0xadd8e6, origin: './x11' },
  { name: 'ghostwhite', rgb: 0xf8f8ff, origin: './x11' },
  { name: 'honeydew', rgb: 0xf0fff0, origin: './x11' },
  { name: 'cornflowerblue', rgb: 0x6495ed, origin: './x11' },
  { name: 'slateblue', rgb: 0x6a5acd, origin: './x11' },
  { name: 'linen', rgb: 0xfaf0e6, origin: './x11' },
  { name: 'darkblue', rgb: 0x00008b, origin: './x11' },
  { name: 'powderblue', rgb: 0xb0e0e6, origin: './x11' },
  { name: 'seagreen', rgb: 0x2e8b57, origin: './x11' },
  { name: 'darkkhaki', rgb: 0xbdb76b, origin: './x11' },
  { name: 'snow', rgb: 0xfffafa, origin: './x11' },
  { name: 'sienna', rgb: 0xa0522d, origin: './x11' },
  { name: 'mediumblue', rgb: 0x0000cd, origin: './x11' },
  { name: 'royalblue', rgb: 0x4169e1, origin: './x11' },
  { name: 'lightcyan', rgb: 0xe0ffff, origin: './x11' },
  { name: 'green', rgb: 0x008000, origin: './x11' },
  { name: 'mediumpurple', rgb: 0x9370db, origin: './x11' },
  { name: 'midnightblue', rgb: 0x191970, origin: './x11' },
  { name: 'cornsilk', rgb: 0xfff8dc, origin: './x11' },
  { name: 'paleturquoise', rgb: 0xafeeee, origin: './x11' },
  { name: 'bisque', rgb: 0xffe4c4, origin: './x11' },
  { name: 'slategray', rgb: 0x708090, origin: './x11' },
  { name: 'darkcyan', rgb: 0x008b8b, origin: './x11' },
  { name: 'khaki', rgb: 0xf0e68c, origin: './x11' },
  { name: 'wheat', rgb: 0xf5deb3, origin: './x11' },
  { name: 'teal', rgb: 0x008080, origin: './x11' },
  { name: 'darkorchid', rgb: 0x9932cc, origin: './x11' },
  { name: 'deepskyblue', rgb: 0x00bfff, origin: './x11' },
  { name: 'salmon', rgb: 0xfa8072, origin: './x11' },
  { name: 'darkred', rgb: 0x8b0000, origin: './x11' },
  { name: 'steelblue', rgb: 0x4682b4, origin: './x11' },
  { name: 'palevioletred', rgb: 0xdb7093, origin: './x11' },
  { name: 'lightslategray', rgb: 0x778899, origin: './x11' },
  { name: 'aliceblue', rgb: 0xf0f8ff, origin: './x11' },
  { name: 'lightslategrey', rgb: 0x778899, origin: './x11' },
  { name: 'lightgreen', rgb: 0x90ee90, origin: './x11' },
  { name: 'orchid', rgb: 0xda70d6, origin: './x11' },
  { name: 'gainsboro', rgb: 0xdcdcdc, origin: './x11' },
  { name: 'mediumseagreen', rgb: 0x3cb371, origin: './x11' },
  { name: 'lightgray', rgb: 0xd3d3d3, origin: './x11' },
  { name: 'mediumturquoise', rgb: 0x48d1cc, origin: './x11' },
  { name: 'lemonchiffon', rgb: 0xfffacd, origin: './x11' },
  { name: 'cadetblue', rgb: 0x5f9ea0, origin: './x11' },
  { name: 'lightyellow', rgb: 0xffffe0, origin: './x11' },
  { name: 'lavenderblush', rgb: 0xfff0f5, origin: './x11' },
  { name: 'coral', rgb: 0xff7f50, origin: './x11' },
  { name: 'purple', rgb: 0x800080, origin: './x11' },
  { name: 'aqua', rgb: 0x00ffff, origin: './x11' },
  { name: 'whitesmoke', rgb: 0xf5f5f5, origin: './x11' },
  { name: 'mediumslateblue', rgb: 0x7b68ee, origin: './x11' },
  { name: 'darkorange', rgb: 0xff8c00, origin: './x11' },
  { name: 'mediumaquamarine', rgb: 0x66cdaa, origin: './x11' },
  { name: 'darksalmon', rgb: 0xe9967a, origin: './x11' },
  { name: 'beige', rgb: 0xf5f5dc, origin: './x11' },
  { name: 'blueviolet', rgb: 0x8a2be2, origin: './x11' },
  { name: 'azure', rgb: 0xf0ffff, origin: './x11' },
  { name: 'lightsteelblue', rgb: 0xb0c4de, origin: './x11' },
  { name: 'oldlace', rgb: 0xfdf5e6, origin: './x11' }
];

/* MIT license */

var conversions = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2keyword: cmyk2keyword,
  
  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2cmyk: keyword2cmyk,
  
  xyz2rgb: xyz2rgb,
};


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max) 
    h = (g - b) / delta; 
  else if (g == max)
    h = 2 + (b - r) / delta; 
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max) 
    h = (g - b) / delta; 
  else if (g == max)
    h = 2 + (b - r) / delta; 
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0) 
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;
      
  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k);
  m = (1 - g - k) / (1 - k);
  y = (1 - b - k) / (1 - k);
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
  
  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  
  return [l, a, b];
}


function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }
  
  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      v;
  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  return [h, s * 100, v * 100];
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;  
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);
        
  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = (r < 0) ? 0 : r;
  g = (g < 0) ? 0 : g;
  b = (b < 0) ? 0 : b;

  return [r * 255, g * 255, b * 255];
}


function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

var exports = {};
var colorConvert = exports;

for (var func in conversions) {
  // export rgb2hslRaw
  exports[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  exports[from] = exports[from] || {};

  exports[from][to] = exports[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}

/* MIT license */


var colorString = {
   getRgba: getRgba,
   getHsla: getHsla,
   getRgb: getRgb,
   getHsl: getHsl,
   getAlpha: getAlpha,

   hexString: hexString,
   rgbString: rgbString,
   rgbaString: rgbaString,
   percentString: percentString,
   percentaString: percentaString,
   hslString: hslString,
   hslaString: hslaString,
   keyword: keyword
};

function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr =  /^#([a-fA-F0-9]{3})$/,
       hex =  /^#([a-fA-F0-9]{6})$/,
       rgba = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d\.]+)\s*)?\)$/,
       per = /^rgba?\(\s*([\d\.]+)\%\s*,\s*([\d\.]+)\%\s*,\s*([\d\.]+)\%\s*(?:,\s*([\d\.]+)\s*)?\)$/,
       keyword = /(\D+)/;

   var rgb = [0, 0, 0],
       a = 1,
       match = string.match(abbr);
   if (match) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
   }
   else if (match = string.match(hex)) {
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorConvert.keyword2rgb(match[1]);
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb.push(a);
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*(\d+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*(?:,\s*([\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var h = scale(parseInt(match[1]), 0, 360),
          s = scale(parseFloat(match[2]), 0, 100),
          l = scale(parseFloat(match[3]), 0, 100),
          a = scale(parseFloat(match[4]) || 1, 0, 1);
      return [h, s, l, a];
   }
}

function getRgb(string) {
   return getRgba(string).slice(0, 3);
}

function getHsl(string) {
   return getHsla(string).slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
}

// generators
function hexString(rgb) {
   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
              + hexDouble(rgb[2]);
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
           + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0]/255 * 100),
       g = Math.round(rgba[1]/255 * 100),
       b = Math.round(rgba[2]/255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
           + alpha + ")";
}

function keyword(rgb) {
   return colorConvert.rgb2keyword(rgb.slice(0, 3));
}

// helpers
function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  var str = num.toString(16).toUpperCase();
  return (str.length < 2) ? "0" + str : str;
}

var colourProximity = {
	proximity: proximity,
	rgb2lab: rgb2lab$1
};

function proximity(s1, s2){
	c1 = rgb2lab$1(colorString.getRgb(s1));
	c2 = rgb2lab$1(colorString.getRgb(s2));
	return Math.sqrt(Math.pow(c1[0]-c2[0],2) + Math.pow(c1[1]-c2[1],2) + Math.pow(c1[2]-c2[2],2));
}

function rgb2lab$1(input){

	// This code is adapted from various functions at http://www.easyrgb.com/index.php?X=MATH

	var rgb = [0,0,0],
		xyz = [0,0,0],
		Lab = [0,0,0];

	for(var i=0; i<input.length;i++){
	   
		var value = input[i]/255;

		if(value > 0.04045){
			value = Math.pow(((value+0.055 )/1.055), 2.4);
		}else{
			value = value / 12.92;
		}
		
		rgb[i] = value * 100;
		
	}
	
	xyz[0] = (rgb[0] * 0.4124 + rgb[1] * 0.3576 + rgb[2] * 0.1805) / 95.047;	// ref_X =  95.047   Observer= 2°, Illuminant= D65
	xyz[1] = (rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722) / 100.0;		// ref_Y = 100.000
	xyz[2] = (rgb[0] * 0.0193 + rgb[1] * 0.1192 + rgb[2] * 0.9505) / 108.883;	// ref_Z = 108.883

	for(var i=0;i<3;i++){
		var value = xyz[i];
		if(value > 0.008856){
			value = Math.pow(value,1/3);
		}else{
			value = (7.787*value)+(16/116);
		}
		xyz[i] = value;
	}

	Lab[0] = parseFloat(( (116*xyz[1]) - 16   ).toFixed(3));
	Lab[1] = parseFloat(( 500*(xyz[0]-xyz[1]) ).toFixed(3));
	Lab[2] = parseFloat(( 200*(xyz[1]-xyz[2]) ).toFixed(3));

	return Lab;

}
var colourProximity_1 = colourProximity.proximity;

// import Chroma from 'chroma-js';

const toChromaNameFromRgb = (rgb) => {
  const suffix = rgb.toString(16);
  const prefix = '#000000';
  return prefix.substring(0, 7 - suffix.length) + suffix;
};

const toEntryFromChromaName = (chromaName) => {
  let bestDistance = Infinity;
  let best;
  for (const entry of colors) {
    const distance = colourProximity_1(chromaName, toChromaNameFromRgb(entry.rgb));
    if (distance < bestDistance) {
      best = entry;
      bestDistance = distance;
    }
  }
  return best;
};

const toTagFromChromaName = (name) => {
  const entry = toEntryFromChromaName(name);
  if (entry !== undefined) {
    return `color/${entry.name.toLowerCase()}`;
  }
  return `color/unknown`;
};

const toRgbFromChromaName = (name, defaultRgb = [0, 0, 0]) => {
  const entry = toEntryFromChromaName(name);
  if (entry !== undefined) {
    const { rgb } = entry;
    const result = [(rgb >> 16) & 0xFF,
                    (rgb >> 8) & 0xFF,
                    (rgb >> 0) & 0xFF];
    return result;
  }
  return defaultRgb;
};

const toRgbFromName = (name, defaultRgb = [0, 0, 0]) => {
  const normalizedName = name.toLowerCase();
  for (const { name, rgb } of colors) {
    if (normalizedName === name) {
      const result = [(rgb >> 16) & 0xFF,
                      (rgb >> 8) & 0xFF,
                      (rgb >> 0) & 0xFF];
      return result;
    }
  }
  return toRgbFromChromaName(name, defaultRgb);
};

const toTagFromRgbInt = (rgbInt, defaultTag = 'color/black') =>
  toTagFromChromaName(`rgb(${(rgbInt >> 16) & 0xFF},${(rgbInt >> 8) & 0xFF},${(rgbInt >> 0) & 0xFF})`);

const toTagFromRgb = ([r = 0, g = 0, b = 0], defaultTag = 'color/black') =>
  toTagFromChromaName(`rgb(${r},${g},${b})`);

const toRgb = (tags = [], defaultRgb = [0, 0, 0]) => {
  let rgb = defaultRgb;
  for (const tag of tags) {
    if (tag.startsWith('color/')) {
      let entry = toRgbFromName(tag.substring(6));
      if (entry !== undefined) {
        return entry;
      }
    }
  }
  return rgb;
};

const toTagFromName = (name) => {
  const tag = toTagFromRgb(toRgbFromName(name));
  return tag;
};

const toTagsFromName = (name) => {
  return [toTagFromName(name)];
};

export { toRgb, toTagFromName, toTagFromRgbInt, toTagsFromName };
