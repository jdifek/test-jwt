export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className=" px-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-gray-300">
              MyAuthApp - современное решение для аутентификации и авторизации
              пользователей.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p className="text-gray-300">Email: support@myauthapp.com</p>
            <p className="text-gray-300">Телефон: +7 (999) 123-45-67</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>© 2025 MyAuthApp. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
