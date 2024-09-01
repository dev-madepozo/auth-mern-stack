import { Check } from "lucide-react"

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ): (
            <Check className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? 'text-green-500': 'text-gray-500'}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (value) => {
    let strength = 0;

    if (value.length >= 6) strength++;
    if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
    if (value.match(/\d/)) strength++;
    if (value.match(/[^a-zA-Z\d]/)) strength++;

    return strength;
  };

  const getStrengthText = (value) => {
    if (value === 0) return 'Very Weak';
    if (value === 1) return 'Weak';
    if (value === 2) return 'Fair';
    if (value === 3) return 'Good';

    return 'Strong';
  };

  const getStrengthColor = (value) => {
    if (value === 0) return 'bg-red-500';
    if (value === 1) return 'bg-red-400';
    if (value === 2) return 'bg-yellow-500';
    if (value === 3) return 'bg-yellow-400';

    return 'bg-green-500';
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={
              `h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getStrengthColor(strength) : 'bg-gray-600'}`
            }
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
