using System;
using System.Collections.Generic;

namespace HRIS.API
{
    public class Utility
    {
        public static string ConvertToString(object o)
        {
            if (o == null)
            {
                if (o is DateTime)
                    return null;
                return string.Empty;
            }
            else if (o.GetType() == typeof(List<string>))
            {
                return string.Join(",", (List<string>)o);
            }
            else if (o.GetType() == typeof(IEnumerable<string>))
            {
                return string.Join(",", (IEnumerable<string>)o);
            }
            else if (o.GetType() == typeof(IEnumerable<string>))
            {
                return string.Join(",", (IEnumerable<string>)o);
            }
            else
                return o.ToString();
        }

        public static string ConvertToString(object o, string separator)
        {
            if (o == null)
            {
                if (o is DateTime)
                    return null;
                return string.Empty;
            }
            else if (o.GetType() == typeof(List<string>))
            {
                return string.Join(separator, (List<string>)o);
            }
            else
                return o.ToString();
        }
    }
}
