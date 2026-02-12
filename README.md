# Keki Maintenance API

## Overview

The Keki Maintenance API is a lightweight service designed to prevent users from accessing non-working code during maintenance periods. This API should be checked during your application's startup cycle to determine if the application should allow user access or display a maintenance message.

## Purpose

When performing maintenance, updates, or deployments on your main application, you want to ensure users don't encounter broken functionality or errors. This API serves as a centralized maintenance status endpoint that your application can query before allowing user access.

## How It Works

1. **Application Startup Check**: When your application starts or a user tries to access it, make a request to this maintenance API
2. **Status Evaluation**: The API returns the current maintenance status
3. **User Routing**: Based on the response:
   - If maintenance is **active**: Redirect users to a maintenance page
   - If maintenance is **inactive**: Allow normal application access

## Integration

### Basic Implementation

Check the maintenance status during your app's initialization:

```javascript
// Example: JavaScript/Node.js
async function checkMaintenanceStatus() {
  try {
    const response = await fetch('https://your-maintenance-api.com/status');
    const data = await response.json();
    
    if (data.maintenance === true) {
      // Redirect to maintenance page
      window.location.href = '/maintenance.html';
    } else {
      // Continue normal app startup
      initializeApp();
    }
  } catch (error) {
    console.error('Failed to check maintenance status:', error);
    // Optionally: Allow app to continue on API failure
    initializeApp();
  }
}
```

### Mobile App Example

```swift
// Example: iOS/Swift
func checkMaintenanceStatus(completion: @escaping (Bool) -> Void) {
    guard let url = URL(string: "https://your-maintenance-api.com/status") else {
        completion(false)
        return
    }
    
    URLSession.shared.dataTask(with: url) { data, response, error in
        guard let data = data,
              let json = try? JSONDecoder().decode(MaintenanceStatus.self, from: data) else {
            completion(false)
            return
        }
        completion(json.maintenance)
    }.resume()
}
```

## API Endpoints

### GET /status

Returns the current maintenance status.

**Response:**
```json
{
  "maintenance": false,
  "message": "Service is operational",
  "estimated_completion": null
}
```

or during maintenance:

```json
{
  "maintenance": true,
  "message": "We're currently performing scheduled maintenance",
  "estimated_completion": "2024-01-15T10:00:00Z"
}
```

## Benefits

- **Improved User Experience**: Users see a proper maintenance page instead of errors
- **Centralized Control**: One API controls maintenance status for all your apps
- **Zero Downtime Deployments**: Gracefully handle maintenance periods
- **Prevent Data Corruption**: Stop users from interacting with the app during critical updates

## Best Practices

1. **Check on Every App Start**: Always verify maintenance status when the app initializes
2. **Handle API Failures Gracefully**: If the maintenance API is unreachable, decide on a fallback behavior
3. **Cache with Short TTL**: Cache the status for a short period (e.g., 1-5 minutes) to reduce API calls
4. **Show Informative Messages**: Display helpful maintenance messages to users with estimated completion times
5. **Test Your Integration**: Regularly test both maintenance and operational modes

## Use Cases

- Scheduled database migrations
- Major feature deployments
- Infrastructure updates
- Emergency fixes requiring temporary downtime
- Third-party service integration updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]