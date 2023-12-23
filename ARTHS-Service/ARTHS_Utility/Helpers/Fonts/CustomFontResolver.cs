using PdfSharp.Fonts;
using System.Reflection;

namespace ARTHS_Utility.Helpers.Fonts
{
    public class CustomFontResolver : IFontResolver
    {
        public string DefaultFontName => "Verdana";

        public byte[] GetFont(string faceName)
        {
            switch (faceName)
            {
                case "Verdana":
                    return LoadFontData("ARTHS_Utility.Helpers.Fonts.verdana.ttf");
                case "Verdana-Bold":
                    return LoadFontData("ARTHS_Utility.Helpers.Fonts.verdana-bold.ttf");
                default:
                    return null!;
            }
        }

        public FontResolverInfo ResolveTypeface(string familyName, bool isBold, bool isItalic)
        {
            if (isBold)
            {
                familyName += "-Bold";
            }
            if (isItalic)
            {
                familyName += "-Italic";
            }

            switch (familyName.ToLower())
            {
                case "verdana":
                case "verdana-bold":
                case "verdana-italic":
                case "verdana-bolditalic":
                    return new FontResolverInfo(familyName);
                default:
                    return new FontResolverInfo(DefaultFontName);
            }
        }

        private byte[] LoadFontData(string name)
        {
            using (Stream? stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(name))
            {
                if (stream == null)
                    throw new FileNotFoundException($"Could not find font resource '{name}'.");
                byte[] data = new byte[stream.Length];
                stream.Read(data, 0, data.Length);
                return data;
            }
        }
    }
}
