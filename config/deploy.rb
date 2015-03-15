require "rvm/capistrano"
require "bundler/capistrano"

# Install whenever to run schedule.rb on deployment
set :whenever_gem, "bundle exec whenever"
require "whenever/capistrano"

set :application,       "arima"
set :repository,        "git@github.com:winstonll/arima.git"
set :domain,            "162.243.7.145"

set :scm,               :git
set :user,              'admin'
set :password,          "4dm1np455!"
set :deploy_via,        :copy
set :keep_releases,     5
set :use_sudo,          false
set :ssh_options,       {:forward_agent => true}
set :branch,            'master'
set :scm_verbose,       true
set :scm_username,      "root"
set :scm_passphrase,    "4dm1np455!"  # The deploy user's password

set :rvm_ruby_string,   'ruby-2.1.1'
set :rvm_type,          :user
set :rvm_install_type,  :stable

set :rails_env,         "production"

set :deploy_to,         "/srv/www/#{application}"

set :bundle_dir,        ''
set :default_shell,     :bash

default_run_options[:pty] = true

role :web, domain                          # Your HTTP server, Apache/etc
role :app, domain                          # This may be the same as your `Web` server
role :db,  domain, :primary => true # This is where Rails migrations will run

# before "deploy:assets:precompile", "bundle:install"
after "deploy:restart", "deploy:cleanup"

namespace :rvm do
  task :trust_rvmrc do
    run "rvm rvmrc trust #{release_path}"
  end
end

namespace :bundler do
  desc "Run: bundle install"
  task :install_gems, :role => :app do
    run "cd #{current_release} && bundle install"
  end

  desc "Run: bundle update"
  task :update_gems, :role => :app do
    sudo run "cd #{current_release} && bundle update"
  end

  desc "Install Bundler"
  task :install_bundler, :role => :app do
    sudo "gem install bundler"
  end

  # desc "run bundle install and ensure all gem requirements are met"
  # task :install, :role => :app do
  #   run "cd #{current_path} && bundle install"
  # end
end


# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  # sudo service nginx restart
  # sudo service nginx stop
  # sudo service nginx start

  task :start do
    run "#{sudo} service nginx start"
  end

  task :stop do
    run "#{sudo} service nginx stop"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    # run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
    run "#{sudo} service nginx restart"
  end
end
