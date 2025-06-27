#include <iostream>
#include <vector>
using namespace std;

bool ok(vector<int>& a) {
    int n = a.size();
    long long x, y, s = a[0] * n - a[n - 1], d = 1LL * n * n - 1;
    if (s % d) return false;
    y = s / d;
    x = a[0] - y * n;
    if (x < 0 || y < 0) return false;
    for (int i = 0; i < n; i++)
        if (x * (i + 1) + y * (n - i) != a[i]) return false;
    return true;
}

int main() {
    int t, n;
    cin >> t;
    while (t--) {
        cin >> n;
        vector<int> a(n);
        for (int& v : a) cin >> v;
        cout << (ok(a) ? "YES\n" : "NO\n");
    }
}
