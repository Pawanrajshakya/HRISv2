namespace HRIS.API
{
    public sealed class UserSession
    {
        private static UserSession _instance = null;
        private static readonly object _lock = new object();
        private static string _lanId;

        public UserSession()
        {
        }

        public static _Role[] Roles { get; set; }
        public static _Group[] Groups { get; set; }

        public static string LanID
        {
            get
            {
                return _lanId;
            }
            set
            {
                if (value == null)
                    _lanId = "";
                else if (value.Contains("\\"))
                    _lanId = value.Substring(value.LastIndexOf("\\") + 1);
                else
                    _lanId = value;
            }
        }
        public static UserSession Instance
        {
            get
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new UserSession();
                    }
                    return _instance;
                }
            }
        }

        public UserDto User { get; set; }

    }
}
